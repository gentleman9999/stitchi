'use client'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import { COMPANY_NAME } from '@lib/constants'
import routes from '@lib/routes'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import * as Portal from '@radix-ui/react-portal'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@components/ui/Container'
import CatalogProductSkeleton from 'app/(catalog)/products/(grid)/CatalogProductSkeleton'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import { gql, useLazyQuery } from '@apollo/client'
import { useDebouncedCallback } from 'use-debounce'
import { useSearch } from '../search-context'
import {
  ProductCatalogSearchNavGetDataQuery,
  ProductCatalogSearchNavGetDataQueryVariables,
} from '@generated/types'
import { notEmpty } from '@lib/utils/typescript'

const schema = yup.object().shape({
  searchTerm: yup.string().required(),
})

interface Props {}

const SearchBar = ({}: Props) => {
  const router = useRouter()
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      searchTerm: '',
    },
  })

  const { showSearch, setShowSearch } = useSearch()

  const [getData, { data, loading }] = useLazyQuery<
    ProductCatalogSearchNavGetDataQuery,
    ProductCatalogSearchNavGetDataQueryVariables
  >(GET_DATA)

  const debouncedGetData = useDebouncedCallback(getData, 500, {
    leading: true,
    trailing: true,
  })

  const { setFocus } = form

  React.useEffect(() => {
    if (showSearch) {
      setFocus('searchTerm')
    }
  }, [showSearch, setFocus])

  const searchTerm = form.watch('searchTerm')

  React.useEffect(() => {
    if (searchTerm) {
      debouncedGetData({
        variables: {
          filters: {
            searchTerm: searchTerm.length > 0 ? searchTerm : undefined,
          },
        },
      })
    }
  }, [searchTerm, debouncedGetData])

  const products = React.useMemo(() => {
    if (!searchTerm) return []

    return (
      data?.site.search.searchProducts.products.edges
        ?.map(edge => edge?.node)
        .filter(notEmpty) || []
    )
  }, [data, searchTerm])

  const handleSubmit = form.handleSubmit(data => {
    setShowSearch(false)
    router.push(
      routes.internal.catalog.href({
        params: {
          searchTerm: data.searchTerm,
        },
      }),
    )
  })

  return (
    <>
      <form className="flex-auto w-full max-w-[400px] " onSubmit={handleSubmit}>
        <div className="w-full bg-white rounded-sm border border-gray-300 focus:ring-0 focus:border-black flex items-center pr-2 h-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            placeholder={`Search ${COMPANY_NAME}`}
            className="w-full rounded-sm border-none focus:ring-0 focus:border-none px-4 py-2 "
            {...form.register('searchTerm')}
          />
          <button
            type="button"
            onClick={() => {
              form.setValue('searchTerm', '')
            }}
            className="flex items-center justify-center rounded-full bg-gray-100 p-1"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* <Portal.Root> */}
      <AnimatePresence>
        {searchTerm.length ? (
          <motion.aside
            className="flex-1 bg-white pb-2 transition-all overflow-scroll"
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: '100vh' }}
            exit={{ maxHeight: 0 }}
          >
            <Container className="@container w-full">
              {products.length || loading ? (
                <ul className="grid grid-cols-2 @3xl:grid-cols-4 gap-4 @4xl:gap-8">
                  {loading ? (
                    <>
                      {Array.from(new Array(4)).map((_, i) => (
                        <CatalogProductSkeleton key={i} />
                      ))}
                    </>
                  ) : (
                    <>
                      {products.map(product => (
                        <CatalogProductLegacy
                          key={product.id}
                          productId={product.id}
                          href={routes.internal.catalog.product.href({
                            productSlug: product.path,
                          })}
                          onClick={() => {
                            setShowSearch(false)
                          }}
                        />
                      ))}
                    </>
                  )}
                </ul>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-center text-gray-500">
                    Please try a different search term
                  </p>
                </div>
              )}
            </Container>
          </motion.aside>
        ) : null}
      </AnimatePresence>
      {/* </Portal.Root> */}

      {/* Backdrop */}
      {showSearch ? (
        <div
          onClick={() => {
            setShowSearch(false)
          }}
          className="fixed inset-0 bg-black opacity-50 z-30 cursor-pointer"
        />
      ) : null}
    </>
  )
}

const GET_DATA = gql`
  ${CatalogProductLegacyFragments.product}
  query ProductCatalogSearchNavGetDataQuery(
    $filters: SearchProductsFiltersInput!
  ) {
    site {
      search {
        searchProducts(filters: $filters, sort: RELEVANCE) {
          products(first: 4) {
            edges {
              node {
                id
                entityId
                ...CatalogProductLegacyProductFragment
              }
            }
          }
        }
      }
    }
  }
`

export default SearchBar
