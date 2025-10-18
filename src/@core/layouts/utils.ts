// ** Types
import type { NextRouter } from 'next/router'

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */
export const handleURLQueries = (router: NextRouter, path: string | undefined): boolean => {
  if (Object.keys(router.query).length && path) {
    const firstKey = Object.keys(router.query)[0]
    const rawValue = firstKey ? router.query[firstKey] : undefined
    const queryValue =
      typeof rawValue === 'string' ? rawValue : Array.isArray(rawValue) ? rawValue[0] : undefined

    return queryValue
      ? router.asPath.includes(path) && router.asPath.includes(queryValue) && path !== '/'
      : false
  }

  return false
}
