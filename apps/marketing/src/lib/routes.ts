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

      success: {
        href: ({ email = '' }) => buildRoute('/start/success', { email }),
      },
    },
    catalog: {
      href: () => buildRoute('/catalog'),
    },
    blog: {
      href: () => buildRoute('/learn'),
      show: {
        href: (postSlug: string) => buildRoute(`/learn/${postSlug}`),
      },
      category: {
        href: ({ categorySlug }: { categorySlug: string }) =>
          buildRoute(`/learn/topic/${categorySlug}`),
      },
    },
    customers: {
      morningBrew: {
        href: () =>
          buildRoute(
            '/powering-morning-brew-newsletter-referral-program-with-custom-swag',
          ),
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
    mailingListSubscription: {
      create: {
        href: () => buildRoute('/api/mailing-list-subscription'),
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
