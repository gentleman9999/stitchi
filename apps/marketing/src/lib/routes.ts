import getOrThrow from '@utils/get-or-throw'
import { format } from 'url'

const supportEmail = getOrThrow(
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  'NEXT_PUBLIC_SUPPORT_EMAIL',
)

type QueryParams = Record<
  string,
  string | string[] | number | boolean | undefined
>

const buildRoute = (path: string, queryParams?: QueryParams): string => {
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
      href: ({ params }: { params?: QueryParams } = {}) =>
        buildRoute('/catalog', params),

      product: {
        href: ({
          brandSlug,
          productSlug,
          params,
        }: {
          brandSlug: string
          productSlug: string
          params?: QueryParams
        }) => {
          const serialize = (s: string) => s.replace(/\//g, '')
          return buildRoute(
            `/${serialize(brandSlug)}-${serialize(productSlug)}`,
            params,
          )
        },
      },
    },
    blog: {
      href: () => buildRoute(`/learn`),
      show: {
        href: (postSlug: string) => buildRoute(`/learn/${postSlug}`),
      },
      page: {
        href: (page: number) => buildRoute(`/learn/page/${page}`),
      },
      category: {
        href: ({
          categorySlug,
          page,
        }: {
          categorySlug: string
          page?: number
        }) =>
          buildRoute(
            `/learn/topic/${categorySlug}${page ? `/page/${page}` : ''}`,
          ),
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
    glossary: {
      href: () => '/directory',
      show: {
        href: ({
          termSlug,
          termType,
        }: {
          termType: string
          termSlug: string
        }) => `/directory/${termType}/${termSlug}`,
      },
      categories: {
        show: {
          href: (categorySlug: string) =>
            `/directory/categories/${categorySlug}`,
        },
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
    partners: {
      href: () => buildRoute('/partners'),
    },
    industries: {
      newsletters: {
        href: () => buildRoute('/newsletter-merchandise-referral-program'),
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
    support: {
      email: {
        href: () => buildRoute(`mailto:${supportEmail}`),
      },
      phone: {
        href: () => buildRoute(`tel:+1-248-221-1863`),
      },
    },
    social: {
      twitter: {
        href: () => buildRoute(`https://twitter.com/gostitchi`),
      },
    },
    customers: {
      morningBrew: {
        href: () => buildRoute(`https://morningbrew.com`),
      },
    },
    careers: {
      href: () => buildRoute(``),
    },
  },
}

export default routes
