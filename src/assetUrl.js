// Resolve public assets against Vite's configured base path. This keeps the
// same build working locally, under GitHub Pages' repository subdirectory,
// and later on a custom domain.
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
