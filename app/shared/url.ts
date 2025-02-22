export function resolvePathname(pathname: string) {
  return pathname.replace(/^\//, import.meta.env.BASE_URL);
}
