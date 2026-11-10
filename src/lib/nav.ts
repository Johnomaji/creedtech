export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href)
}
