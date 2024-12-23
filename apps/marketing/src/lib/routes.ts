import getOrThrow from '@lib/utils/get-or-throw'
import { format } from 'url'

const supportEmail = getOrThrow(
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  'NEXT_PUBLIC_SUPPORT_EMAIL',
)

const supportUrl = getOrThrow(
  process.env.NEXT_PUBLIC_SUPPORT_URL,
  'NEXT_PUBLIC_SUPPORT_URL',
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
    login: {
      href: (params: { returnTo?: string } = {}) =>
        buildRoute('/api/auth/login', {
          redirectUrl: params.returnTo,
        }),
    },
    logout: {
      href: (params: { returnTo?: string } = {}) =>
        buildRoute('/api/auth/logout', {
          redirectUrl: params.returnTo,
        }),
    },
    signup: {
      href: ({ redirectTo = '/products' }: { redirectTo?: string } = {}) =>
        buildRoute('/api/auth/signup', {
          redirectUrl: redirectTo,
        }),
    },
    contact: {
      href: () => buildRoute('/contact'),

      success: {
        href: ({ email = '' }) => buildRoute('/contact/success', { email }),
      },
    },
    getStarted: {
      href: () =>
        buildRoute('/api/auth/signup', {
          redirectUrl: '/closet',
        }),
    },
    catalog: {
      href: () => buildRoute(`/products`),

      all: {
        href: ({ params }: { params?: QueryParams } = {}) =>
          buildRoute('/products', params),
      },

      brand: {
        show: {
          href: ({ brandSlug }: { brandSlug: string }) =>
            buildRoute(`/${brandSlug.replaceAll('/', '')}`),
        },
      },

      category: {
        show: {
          href: ({ categorySlug }: { categorySlug: string }) =>
            // Replace leading and trailing slash
            buildRoute(`/${categorySlug.replace(/^\/|\/$/g, '')}`),
        },
      },

      product: {
        href: ({
          productSlug,
          params,
        }: {
          productSlug: string
          params?: QueryParams
        }) => {
          const serialize = (s: string) => s.replace(/\//g, '')
          return buildRoute(`/${serialize(productSlug)}`, params)
        },

        share: {
          href: ({ productSlug }: { productSlug: string }) => {
            const serialize = (s: string) => s.replace(/\//g, '')
            return buildRoute(`/${serialize(productSlug)}/share`)
          },
        },
      },
      wizard: {
        welcome: {
          href: () => buildRoute('/products/wizard/welcome'),
        },
        categories: {
          href: () => buildRoute('/products/wizard/categories'),

          styles: {
            href: ({ categoryId }: { categoryId: string }) =>
              buildRoute(`/products/wizard/categories/${categoryId}/styles`),
          },
        },
      },
    },
    order: {
      show: {
        pay: {
          href: ({ orderId }: { orderId: string }) =>
            buildRoute(`/orders/${orderId}/pay`),
        },
      },
    },
    lookbook: {
      href: () => buildRoute('/lookbook'),

      categories: {
        href: () => buildRoute('/lookbook/categories'),

        show: {
          href: ({ categorySlug }: { categorySlug: string }) =>
            `/custom-${categorySlug}-shirts`,
        },
      },
    },

    insights: {
      href: () => buildRoute('/insights'),

      show: {
        href: ({ insightSlug }: { insightSlug: string }) =>
          buildRoute(`/insights/${insightSlug}`),
      },
    },

    conferences: {
      href: () => buildRoute('/conferences'),

      show: {
        href: ({ conferenceSlug }: { conferenceSlug: string }) =>
          buildRoute(`/conferences/${conferenceSlug}`),
      },
    },

    tradeshows: {
      href: () => buildRoute('/tradeshows'),

      show: {
        href: ({ tradeshowSlug }: { tradeshowSlug: string }) =>
          buildRoute(`/tradeshows/${tradeshowSlug}`),
      },
    },
    learn: {
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

    blog: {
      href: () => buildRoute('/blog'),
    },

    customers: {
      morningBrew: {
        href: () =>
          buildRoute(
            '/powering-morning-brew-newsletter-referral-program-with-custom-swag',
          ),
      },
    },

    solutions: {
      href: () => buildRoute('/solutions'),

      loyaltyPrograms: {
        href: () => buildRoute('/loyalty-referral-programs'),
      },
      swagBox: {
        href: () => buildRoute('/swag-bags-and-boxes'),
      },

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

    ebooks: {
      studentMerchBusiness: {
        href: () => buildRoute('/how-to-start-student-merch-business'),
      },
    },

    industries: {
      href: () => buildRoute('/industries'),

      show: {
        href: (industrySlug: string) =>
          buildRoute(`/industries/${industrySlug}`),
      },
    },

    closet: {
      href: () => buildRoute('/closet'),

      dashboard: {
        href: () => buildRoute('/closet/dashboard'),
      },

      integrations: {
        href: () => buildRoute('/closet/integrations'),
      },

      orders: {
        href: () => buildRoute('/closet/orders'),

        show: {
          href: ({ orderId }: { orderId: string }) =>
            buildRoute(`/closet/orders/${orderId}`),
        },
      },

      inventory: {
        href: () => buildRoute('/closet/inventory'),

        show: {
          products: {
            show: {
              href: ({ designId }: { designId: string }) =>
                buildRoute(`/closet/inventory/products/${designId}`),

              buy: {
                href: ({ designId }: { designId: string }) =>
                  buildRoute(`/closet/inventory/products/${designId}/order`),
              },

              inventory: {
                href: ({ designId }: { designId: string }) =>
                  buildRoute(
                    `/closet/inventory/products/${designId}/inventory`,
                  ),
              },
            },
          },
        },
      },

      designs: {
        href: (params?: QueryParams) => buildRoute('/closet/designs', params),

        inProgress: {
          href: (params?: QueryParams) =>
            buildRoute('/closet/designs/in-progress', params),
        },

        approved: {
          href: (params?: QueryParams) =>
            buildRoute('/closet/designs/approved', params),
        },

        archived: {
          href: (params?: QueryParams) =>
            buildRoute('/closet/designs/archived', params),
        },

        create: {
          href: () => buildRoute('/products'),
        },

        show: {
          href: ({ designId }: { designId: string }) =>
            buildRoute(`/closet/designs/${designId}`),

          approved: {
            href: ({ designRequestId }: { designRequestId: string }) =>
              buildRoute(`/closet/designs/${designRequestId}/approved`),
          },

          proofs: {
            create: {
              href: ({ designId }: { designId: string }) =>
                buildRoute(`/closet/designs/${designId}/proofs/new`),
            },

            show: {
              approve: {
                href: ({
                  designId,
                  proofId,
                }: {
                  designId: string
                  proofId: string
                }) =>
                  buildRoute(
                    `/closet/designs/${designId}/proofs/${proofId}/approve`,
                  ),
              },
            },
          },

          assign: {
            href: ({
              designId,
              membershipId,
            }: {
              designId: string
              membershipId: string
            }) =>
              buildRoute(`/closet/designs/${designId}/assign/${membershipId}`),
          },

          archive: {
            href: ({ designRequestId }: { designRequestId: string }) =>
              buildRoute(`/closet/designs/${designRequestId}/archive`),
          },
        },
      },

      collections: {
        href: (params?: QueryParams) =>
          buildRoute('/closet/collections', params),
      },

      brand: {
        href: () => buildRoute('/closet/brand'),
      },

      settings: {
        general: {
          href: () => buildRoute('/closet/settings/general'),
        },

        team: {
          href: () => buildRoute('/closet/settings/team'),
        },

        organization: {
          href: () => buildRoute('/closet/settings/organization'),
        },
      },

      admin: {
        tools: {
          href: () => buildRoute('/closet/admin/tools'),
        },
      },
    },

    account: {
      authenticated: {
        href: (params?: { redirectUrl?: string }) =>
          buildRoute('/account/authenticated', params),
      },

      memberships: {
        href: ({
          redirectUrl,
        }: {
          redirectUrl?: string
        } = {}) => buildRoute('/account/memberships', { redirectUrl }),
      },
    },
  },

  api: {
    formResponse: {
      create: {
        href: () => buildRoute('/api/form-response'),
      },
    },

    downloads: {
      studentEbook: {
        show: {
          href: () => buildRoute('/api/downloads/student-business-ebook'),
        },
      },
    },

    auth: {
      accessToken: {
        href: () => buildRoute('/api/auth/accessToken'),
      },
    },
  },
  external: {
    support: {
      href: () => buildRoute(supportUrl),

      email: {
        href: ({ params }: { params?: QueryParams } = {}) =>
          buildRoute(`mailto:${supportEmail}`, params),
      },
      phone: {
        href: () => buildRoute(`tel:+1-248-221-1863`),
      },

      pricing: {
        href: () =>
          buildRoute(
            'https://help.stitchi.co/en/articles/8610015-pricing-understanding-your-costs-with-stitchi',
          ),
      },

      features: {
        teamStores: {
          href: () =>
            buildRoute(
              'https://help.stitchi.co/en/articles/8296184-team-stores',
            ),
        },
        ecommerceFulfillment: {
          href: () =>
            buildRoute(
              'https://help.stitchi.co/en/articles/8296183-ecommerce-fulfillment',
            ),
        },
      },
      production: {
        printProcesses: {
          href: () =>
            buildRoute(
              'https://help.stitchi.co/en/articles/8348533-print-processes',
            ),
        },
      },
    },
    social: {
      twitter: {
        href: () => buildRoute(`https://twitter.com/gostitchi`),
      },
      linkedin: {
        href: () => buildRoute(`https://www.linkedin.com/company/stitchi`),
      },
    },
    customers: {
      morningBrew: {
        href: () => buildRoute(`https://morningbrew.com`),
      },
    },
    careers: {
      href: () =>
        buildRoute(
          `https://stitchi.notion.site/Careers-043a320634cb459c923aef1779433456`,
        ),
    },
  },
}

export default routes
