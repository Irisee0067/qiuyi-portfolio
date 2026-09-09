from io import BytesIO
from pathlib import Path

from PIL import Image, ImageCms, ImageOps
import numpy as np


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PROJECT_ROOT / "source-assets" / "original-public-assets"
TARGET_ROOT = PROJECT_ROOT / "public" / "assets"
SRGB_PROFILE = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB"))
SRGB_BYTES = SRGB_PROFILE.tobytes()

JOBS = [
    ("about-portrait.jpg", "about-portrait.webp", (1400, 2100), 88),
    ("huyingji/cover.jpg", "huyingji/cover.webp", (1200, 800), 90),
    ("xunyangji/cover.jpg", "xunyangji/cover.webp", (1200, 1800), 90),
    ("zilicangwu/01.jpg", "zilicangwu/cover.webp", (1273, 1800), 90),
]

for group in ("huyingji", "xunyangji", "zilicangwu"):
    for source in sorted((SOURCE_ROOT / group).glob("[0-9][0-9].jpg")):
        JOBS.append((str(source.relative_to(SOURCE_ROOT)), str(source.relative_to(SOURCE_ROOT).with_suffix(".webp")), (1900, 2700), 90))


def convert_to_srgb(opened: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(opened)
    embedded_profile = image.info.get("icc_profile")
    if embedded_profile:
        try:
            source_profile = ImageCms.ImageCmsProfile(BytesIO(embedded_profile))
            return ImageCms.profileToProfile(
                image,
                source_profile,
                SRGB_PROFILE,
                renderingIntent=ImageCms.Intent.PERCEPTUAL,
                outputMode="RGB",
            )
        except (ImageCms.PyCMSError, OSError):
            pass
    return image.convert("RGB")


def optimize(source_name: str, target_name: str, maximum: tuple[int, int], quality: int) -> None:
    source = SOURCE_ROOT / source_name
    target = TARGET_ROOT / target_name
    with Image.open(source) as opened:
        image = convert_to_srgb(opened)
        image.thumbnail(maximum, Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, "WEBP", quality=quality, method=6, icc_profile=SRGB_BYTES)
    before = source.stat().st_size
    after = target.stat().st_size
    print(f"{source_name} -> {target_name}: {before / 1048576:.2f}MB -> {after / 1048576:.2f}MB")


for job in JOBS:
    optimize(*job)


def create_site_palette_hero() -> None:
    source = SOURCE_ROOT / "hero-background.png"
    target = TARGET_ROOT / "hero-background-palette.webp"
    with Image.open(source) as opened:
        image = convert_to_srgb(opened)
        pixels = np.asarray(image, dtype=np.float32)
        red, green, blue = pixels[..., 0], pixels[..., 1], pixels[..., 2]
        low = pixels.min(axis=2)
        luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
        red_mask = (red > green * 1.04) & (red > blue * 1.08) & ((red - low) > 18)
        blue_mask = ~red_mask & (blue > red * 1.02) & ((blue - low) > 10)
        paper = np.array([238, 234, 221], dtype=np.float32)
        site_blue = np.array([201, 221, 222], dtype=np.float32)
        site_red = np.array([181, 42, 53], dtype=np.float32)
        result = np.empty_like(pixels)
        paper_factor = (0.88 + luminance * 0.14)[..., None]
        blue_factor = (0.72 + luminance * 0.38)[..., None]
        red_factor = (0.76 + luminance * 0.34)[..., None]
        result[:] = paper * paper_factor
        result[blue_mask] = (site_blue * blue_factor)[blue_mask]
        result[red_mask] = (site_red * red_factor)[red_mask]
        result = np.clip(result, 0, 255).astype(np.uint8)
        Image.fromarray(result, "RGB").save(target, "WEBP", quality=84, method=6, icc_profile=SRGB_BYTES)
    print(f"hero palette -> {target.name}: {target.stat().st_size / 1048576:.2f}MB")


create_site_palette_hero()
