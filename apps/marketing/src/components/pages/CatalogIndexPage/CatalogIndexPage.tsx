import { Section } from '@components/common'
import React from 'react'
import { Container } from '@components/ui'
import CatalogIndexPageFilters from './CatalogIndexPageFilters'
import CatalogIndexPageProductGrid from './CatalogIndexPageProductGrid'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import Header from './Header'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import { SearchProductsFiltersInput } from '@generated/globalTypes'
import {
  CatalogFiltersProvider,
  useCatalogFilters,
} from './catalog-filters-context'
import { useRouter } from 'next/router'

export const DEFUALT_QUERY_VARIABLES = {
  first: 30,
  filters: {
    brandEntityIds: undefined,
    categoryEntityIds: undefined,
    searchSubCategories: true,
  },
}

export interface CatalogIndexPageProps {
  // When this page is used as a background, for example, behind a modal, we to remove emphasis on it's content for SEO purposes
  isBackground?: boolean
}

const CatalogIndexPage = ({ isBackground = false }: CatalogIndexPageProps) => {
  const { query, replace } = useRouter()
  const gridEndRef = React.useRef<HTMLDivElement>(null)

  const {
    activeFilters: { brands, categories },
  } = useCatalogFilters()

  const formattedFilters: SearchProductsFiltersInput = React.useMemo(
    () => ({
      ...DEFUALT_QUERY_VARIABLES.filters,
      brandEntityIds: brands.length
        ? brands.map(({ entityId }) => entityId)
        : undefined,
      categoryEntityIds: categories.length
        ? categories.map(({ entityId }) => entityId)
        : undefined,
    }),
    [brands, categories],
  )

  const { data, refetch, networkStatus, fetchMore } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      ...DEFUALT_QUERY_VARIABLES,
      after: typeof query.after === 'string' ? query.after : undefined,
      filters: formattedFilters,
    },
  })

  React.useEffect(() => {
    refetch({
      filters: formattedFilters,
    })
  }, [formattedFilters, refetch])

  React.useEffect(() => {
    const { after } = query
    if (typeof after === 'string') {
      fetchMore({
        variables: { after },
      })

      const newQuery = { ...query }
      delete newQuery.after

      replace({ query: newQuery })
    }
  }, [query, fetchMore, replace])

  return (
    <>
      <Container>
        <Header TitleTag={isBackground ? 'h2' : undefined} />
      </Container>
      <Container>
        <Section gutter="md">
          <CatalogIndexPageFilters catalogEndRef={gridEndRef} />

          <div className="mt-4 grid grid-cols-1 gap-10">
            <div className="col-span-1">
              <CatalogIndexPageProductGrid
                fetchMore={fetchMore}
                site={data?.site}
                loading={networkStatus !== NetworkStatus.ready}
              />
            </div>
          </div>
        </Section>
        <div ref={gridEndRef} />
      </Container>
    </>
  )
}

const withFilterContext = (
  Component: React.ComponentType<CatalogIndexPageProps>,
) => {
  const filterContext = (props: CatalogIndexPageProps) => {
    return (
      <CatalogFiltersProvider>
        <Component {...props} />
      </CatalogFiltersProvider>
    )
  }

  return filterContext
}

export const GET_DATA = gql`
  ${CatalogIndexPageProductGrid.fragments.site}
  query CatalogIndexPageGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $first: Int!
    $after: String
  ) {
    site {
      ...CatalogIndexPageProductGridSiteFragment
    }
  }
`

export default withFilterContext(CatalogIndexPage)
