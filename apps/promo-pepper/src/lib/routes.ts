import { format } from 'url'

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

    directory: {
      href: () => '/directory',
      companies: {
        show: {
          href: ({ companySlug }: { companySlug: string }) =>
            buildRoute(`/companies/${companySlug}`),
        },
      },
      categories: {
        show: {
          href: ({ categorySlug }: { categorySlug: string }) =>
            buildRoute(`/directory/${categorySlug}`),
        },
      },
    },

    newsletter: {
      href: () => '/issues',
      issues: {
        show: {
          href: ({ issueSlug }: { issueSlug: string }) =>
            buildRoute(`/issues/${issueSlug}`),
        },
      },
    },
  },
}

export default routes
