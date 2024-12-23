import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import styles from './ProductShowPageDetails.module.css'
import { ChevronDown, ChevronUp } from 'icons'
import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr'
import { fragments } from './ProductShowPageDetails.fragments'
import Button from '@components/ui/ButtonV2/Button'
import { ProductShowPageDetailsProductFragment } from '@generated/types'
import { notEmpty } from '@lib/utils/typescript'

const tableDataClasses = 'flex justify-end pl-8 py-2'

const MIN_HEIGHT = 300

interface Props {
  productId: string
}

const ProductShowPageDetails = ({ productId }: Props) => {
  const { data: product } = useFragment<ProductShowPageDetailsProductFragment>({
    fragment: fragments.product,
    fragmentName: 'ProductShowPageDetailsProductFragment',
    from: {
      __typename: 'Product',
      id: productId,
    },
  })
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    if (ref) {
      const scrollHeight = ref.scrollHeight

      if (expanded) {
        ref.setAttribute('style', `max-height: ${scrollHeight}px`)
      } else {
        ref.setAttribute('style', `max-height: ${MIN_HEIGHT}px`)
      }
    }
  }, [expanded, ref])

  const handleToggle = (expanded: boolean) => {
    if (expanded) {
      setExpanded(expanded)
    } else {
      ref?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setExpanded(expanded)
    }
  }

  const alwaysExpanded = (ref?.scrollHeight || 0) < MIN_HEIGHT

  const customFields: Map<string, string[]> = new Map()

  product.customFields?.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)
    .forEach(field => {
      if (field.name && field.value) {
        if (!customFields.has(field.name)) {
          customFields.set(field.name, [])
        }

        customFields.get(field.name)?.push(field.value)
      }
    })

  return (
    <div>
      <h2 className="font-headingDisplay uppercase text-xl md:text-2xl">
        Product details
      </h2>
      <div
        ref={setRef}
        className={cx(
          `mt-4 relative max-h-[${
            alwaysExpanded ? 'none' : `${MIN_HEIGHT}px`
          }] transition-all duration-500 overflow-hidden scroll-mt-20`,
        )}
      >
        <div
          className={cx(
            'absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white',
            {
              hidden: expanded || alwaysExpanded,
            },
          )}
        />
        <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-8">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <table className="table-auto text-gray-600 ">
              <caption className="font-medium mb-4 sr-only">
                Specifications
              </caption>
              <tbody>
                <tr className="border-y">
                  <td>Brand</td>
                  <td className={tableDataClasses}>
                    {product.brand?.path ? (
                      <Link
                        href={routes.internal.catalog.brand.show.href({
                          brandSlug: product.brand.path.replace('/', ''),
                        })}
                        className="underline"
                      >
                        {product.brand.name}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
                <tr className="border-y">
                  <td>Categories</td>
                  <td className={tableDataClasses}>
                    <div className="flex flex-wrap justify-end">
                      {product.categories?.edges
                        ?.map(edge => edge?.node)
                        .map((category, i) =>
                          category?.path ? (
                            <span
                              key={category?.id}
                              className="whitespace-pre-line text-right"
                            >
                              <Link
                                href={routes.internal.catalog.category.show.href(
                                  {
                                    categorySlug: category.path.replace(
                                      '/',
                                      '',
                                    ),
                                  },
                                )}
                                className="hover:underline"
                              >
                                {category?.name}
                              </Link>
                              {i !==
                              (product.categories?.edges?.length || 0) - 1 ? (
                                <span className="mx-1">/</span>
                              ) : null}
                            </span>
                          ) : null,
                        )}
                    </div>
                  </td>
                </tr>

                {Array.from(customFields.entries()).map(([name, values]) => (
                  <tr key={name} className="border-y">
                    <td className="whitespace-nowrap">{name}</td>
                    <td className={tableDataClasses}>{values.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {product.description ? (
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className={cx(
                'prose prose-sm max-w-none col-span-12 sm:col-span-6 lg:col-span-8 prose-h2:text-lg',
                styles.description,
              )}
            />
          ) : null}
        </div>
      </div>

      {alwaysExpanded ? null : (
        <div className="flex justify-center">
          <Button
            variant="naked"
            onClick={() => handleToggle(!expanded)}
            endIcon={
              expanded ? (
                <ChevronUp className="w-4 stroke-2" />
              ) : (
                <ChevronDown className="w-4 stroke-2" />
              )
            }
          >
            {expanded ? 'Read less' : 'Read more'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductShowPageDetails
