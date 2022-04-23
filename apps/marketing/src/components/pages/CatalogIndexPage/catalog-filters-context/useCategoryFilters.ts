import { gql } from '@apollo/client'
import { UseCategoryFiltersSiteFragment } from '@generated/UseCategoryFiltersSiteFragment'
import useQueryParamArray from './useQueryParamArray'

type Site = UseCategoryFiltersSiteFragment | null | undefined

interface Props {
  site: Site
}

const useCategoryFilters = ({ site }: Props) => {
  const categories = makeCategories(site)
  const {
    value: categoryIds,
    handleToggle: handleToggleCategoryId,
    handleClear: handleClearCategoryIds,
  } = useQueryParamArray({ param: 'categoryIds' })

  const activeCategories = categories.filter(c =>
    categoryIds.includes(c.entityId.toString()),
  )

  const availableCategories = categories.map(category => ({
    ...category,
    active: categoryIds.includes(category.entityId.toString()),
  }))

  return {
    activeCategories,
    availableCategories,
    toggleCategory: handleToggleCategoryId,
    clearCategories: handleClearCategoryIds,
  }
}

const CATEGORY_FRAGMENT = gql`
  fragment UseCategoryFiltersCategoryFragment on CategoryTreeItem {
    entityId
    name
  }
`

useCategoryFilters.fragments = {
  site: gql`
    ${CATEGORY_FRAGMENT}
    fragment UseCategoryFiltersSiteFragment on Site {
      categoryTree {
        ...UseCategoryFiltersCategoryFragment
      }
    }
  `,
}

const makeCategories = (site: Site) => {
  return site?.categoryTree || []
}

export default useCategoryFilters
