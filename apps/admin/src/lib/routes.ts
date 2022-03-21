import { format } from 'url'

const buildRoute = (
  path: string,
  queryParams?: Record<
    string,
    string | string[] | number | boolean | undefined
  >,
): string => {
  if (queryParams) {
    // Remove 'undefined' query params
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] === undefined) {
        // eslint-disable-next-line no-param-reassign
        delete queryParams[key]
      }
    })
  }
  return format({
    pathname: path,
    query: queryParams,
  })
}

const routes = {
  internal: {
    home: {
      href: () => buildRoute('/'),
    },
    products: {
      href: () => buildRoute('/products'),

      show: (productUuid: string) => buildRoute(`/products/${productUuid}`),
    },
    api: {
      auth: {
        logout: {
          href: () => buildRoute('/api/auth/logout'),
        },
      },
    },
  },
  external: {
    ssActivewear: {
      product: {
        show: {
          href: ({
            brandSlug,
            productStyle,
          }: {
            brandSlug: string
            productStyle: string
          }) =>
            buildRoute(
              `https://www.ssactivewear.com/p/${brandSlug}/${productStyle}`,
            ),
        },
      },
    },
  },
}

export default routes
