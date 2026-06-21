export function resolvePathname(pathname: string) {
  return pathname.replace(/^\//u, import.meta.env.BASE_URL);
}
