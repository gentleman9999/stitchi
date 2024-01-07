import { gql, useQuery } from '@apollo/client'
import Button from '@components/ui/ButtonV2/Button'
import {
  CatalogWizardPageCategoryStepGetCategoryDataQuery,
  CatalogWizardPageCategoryStepGetCategoryDataQueryVariables,
} from '@generated/CatalogWizardPageCategoryStepGetCategoryDataQuery'
import routes from '@lib/routes'
import { AnimatePresence, motion } from 'framer-motion'
import { useQueryState } from 'nuqs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {}

const CategoryStepNew = (props: Props) => {
  const router = useRouter()
  const [parentCategoryId, setParentCategoryId] = useQueryState<number>(
    'category',
    {
      defaultValue: 520,
      parse: Number,
      history: 'push',
    },
  )

  const { data, loading } = useQuery<
    CatalogWizardPageCategoryStepGetCategoryDataQuery,
    CatalogWizardPageCategoryStepGetCategoryDataQueryVariables
  >(GET_CATEGORY_DATA, {
    variables: {
      rootEntityId: parentCategoryId,
    },
  })

  const parentCategory = data?.site.categoryTree?.[0]

  return (
    <div className="flex flex-col items-center gap-20">
      <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-center">
        Choose a category below that best describes the product you are looking
        for.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {parentCategory?.children?.map(category => {
            return (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={category.entityId}
                className="text-lg md:text-xl font-semibold text-center py-2 px-6 md:py-4 :px-8 rounded-sm border border-gray-300 hover:border-gray-400 focus:border-gray-400 transition-colors"
                onClick={() => {
                  if (category.hasChildren) {
                    setParentCategoryId(category.entityId)
                  } else {
                    router.push(
                      routes.internal.catalog.category.show.href({
                        categorySlug: category.path,
                      }),
                    )
                  }
                }}
              >
                {category.name}
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        className="flex flex-col-reverse md:flex-row gap-4"
      >
        <Button size="xl" variant="naked" onClick={() => router.back()}>
          Previous
        </Button>
        <Button
          type="submit"
          size="xl"
          Component={Link}
          href={
            parentCategory
              ? routes.internal.catalog.category.show.href({
                  categorySlug: parentCategory.path,
                })
              : routes.internal.catalog.href()
          }
        >
          View catalog from here
        </Button>
      </motion.div>
    </div>
  )
}

const GET_CATEGORY_DATA = gql`
  query CatalogWizardPageCategoryStepGetCategoryDataQuery($rootEntityId: Int!) {
    site {
      categoryTree(rootEntityId: $rootEntityId) {
        entityId
        name
        path
        children {
          entityId
          name
          path
          hasChildren
        }
      }
    }
  }
`

// const GET_PRODUCT_DATA = gql`
//   query CatalogWizardPageCategoryStepGetProductDataQuery {
//     site {
//       search {
//         searchProducts(filters: { brandEntityIds: [1] }) {
//           products {
//             edges {
//               node {
//                 id
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

export default CategoryStepNew
