import {
  SearchProductsFiltersInput,
  SearchProductsSortInput,
} from '@generated/types'
import {
  SetValues,
  UseQueryStatesKeysMap,
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'
import React, { useTransition } from 'react'
import * as yup from 'yup'

const DEFAULT_FILTERS = {
  hideOutOfStock: true,
  searchSubCategories: true,
}

export interface QueryStates {
  after: string
  brandEntityIds: number[]
  categoryEntityIds: number[]
  maxPrice: number
  minPrice: number
  searchTerm: string
  sort: SearchProductsSortInput
  productAttributes: { attribute: string; values: string[] }[]
}

interface State {
  variables: {
    first: number
    sort: SearchProductsSortInput
    after: string
    filters: SearchProductsFiltersInput
  }
  setQueryStates: SetValues<UseQueryStatesKeysMap<QueryStates>>
  transitioningQuery: boolean
}

const CatalogQueryStatesContext = React.createContext<State | undefined>(
  undefined,
)

interface Props {
  children: React.ReactNode
}

const CatalogQueryStatesProvider = ({ children }: Props) => {
  const [transitioningQuery, startQueryTransition] = useTransition()

  const [
    {
      after,
      brandEntityIds,
      categoryEntityIds,
      maxPrice,
      minPrice,
      searchTerm,
      sort,
      productAttributes,
    },
    setQueryStates,
  ] = useQueryStates(
    {
      after: parseAsString.withDefault(''),
      sort: parseAsStringEnum(
        Object.values(SearchProductsSortInput),
      ).withDefault(SearchProductsSortInput.RELEVANCE),
      searchTerm: parseAsString.withDefault(''),
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
      brandEntityIds: parseAsArrayOf(parseAsInteger),
      categoryEntityIds: parseAsArrayOf(parseAsInteger),
      productAttributes: parseAsJson(value =>
        yup
          .array()
          .of(
            yup
              .object()
              .shape({
                attribute: yup.string().required(),
                values: yup.array().of(yup.string().required()).required(),
              })
              .required(),
          )
          .defined()
          .validateSync(value),
      ),
    },
    {
      clearOnDefault: true,
      startTransition: startQueryTransition,
    },
  )

  const variables = React.useMemo(
    () => ({
      first: 20,
      sort,
      after,
      filters: {
        ...DEFAULT_FILTERS,
        searchTerm,
        brandEntityIds,
        categoryEntityIds,
        productAttributes,
        price: { maxPrice, minPrice },
      },
    }),
    [
      after,
      brandEntityIds,
      categoryEntityIds,
      maxPrice,
      minPrice,
      searchTerm,
      sort,
      productAttributes,
    ],
  )

  return (
    <CatalogQueryStatesContext.Provider
      value={{
        setQueryStates,
        transitioningQuery,
        variables,
      }}
    >
      {children}
    </CatalogQueryStatesContext.Provider>
  )
}

const useCatalogQueryStates = () => {
  const context = React.useContext(CatalogQueryStatesContext)

  if (!context) {
    throw new Error(
      'useCatalogQueryStates must be used within a CatalogQueryStatesProvider',
    )
  }

  return context
}

export { CatalogQueryStatesProvider, useCatalogQueryStates }
