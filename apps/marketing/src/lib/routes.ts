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
    getStarted: {
      href: () => buildRoute('/start'),
    },
    blog: {
      href: () => buildRoute('/learn'),
      show: {
        href: (postSlug: string) => buildRoute(`/learn/${postSlug}`),
      },
      category: {
        href: ({ categorySlug }) => buildRoute(`/learn/topic/${categorySlug}`),
      },
    },
    customers: {
      morningBrew: {
        href: () => buildRoute('/morning-brew-newsletter-referral-program'),
      },
    },
    features: {
      design: {
        href: () => buildRoute('/promotional-product-design'),
      },
      customization: {
        href: () => buildRoute('/promotional-product-customization'),
      },
      distribution: {
        href: () => buildRoute('/promotional-product-distribution'),
      },
    },
    legal: {
      privacy: {
        href: () => buildRoute('/privacy-policy'),
      },
      terms: {
        href: () => buildRoute('/terms-of-use'),
      },
    },
  },
  api: {
    formResponse: {
      create: {
        href: () => buildRoute('/api/form-response'),
      },
    },
  },
  external: {
    social: {
      twitter: {
        href: () => buildRoute(`https://twitter.com/gostitchi`),
      },
    },
  },
}

export default routes
