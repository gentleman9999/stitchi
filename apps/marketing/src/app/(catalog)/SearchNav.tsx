'use client'

import React from 'react'
import cx from 'classnames'
import Container from '@components/ui/Container'
import Link from 'next/link'
import routes from '@lib/routes'
import Logo from '@components/ui/Logo'
import IconButton from '@components/ui/IconButton'
import { XIcon } from 'icons'
import { gql, useLazyQuery } from '@apollo/client'
import {
  ProductCatalogSearchNavGetDataQuery,
  ProductCatalogSearchNavGetDataQueryVariables,
} from '@generated/types'
import { notEmpty } from '@lib/utils/typescript'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import { AnimatePresence, motion } from 'framer-motion'
import CatalogProductSkeleton from './catalog/(grid)/CatalogPorductGrid/CatalogProductSkeleton'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDebouncedCallback } from 'use-debounce'
import { useSearch } from './layout-context'

const schema = yup.object().shape({
  searchTerm: yup.string().required(),
})

interface Props {}

const SearchNav = ({}: Props) => {
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
          search: data.searchTerm,
        },
      }),
    )
  })

  return (
    <>
      <div
        className={cx(
          'fixed h-topbar-height bg-white top-0 left-0 right-0 z-40 border-b',
          {
            'opacity-0 !-z-10 overflow-hidden': !showSearch,
          },
        )}
      >
        <Container className="max-w-none flex items-center h-full">
          <nav className={'flex-1 flex gap-2'}>
            <div className="hidden sm:block flex-1">
              <Link
                href={routes.internal.home.href()}
                passHref
                className="contents"
              >
                <Logo className="h-[30px]" />
              </Link>
            </div>

            <form className="flex-auto" onSubmit={handleSubmit}>
              <div className="w-full rounded-sm border border-gray-300 focus:ring-0 focus:border-black flex items-center pr-2">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search products"
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
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex-1 justify-end flex">
              <IconButton
                onClick={() => {
                  setShowSearch(false)
                }}
              >
                <XIcon className="w-6 h-6" />
              </IconButton>
            </div>
          </nav>
        </Container>

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
                            priority
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
      </div>

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

export default SearchNav
