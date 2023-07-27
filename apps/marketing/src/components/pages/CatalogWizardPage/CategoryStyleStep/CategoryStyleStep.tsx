import React from 'react'
import { categories, Category, Style } from '../wizard-data'

const getCategoryById = (
  categoryId: string,
  cats: (Category | Style)[],
): Category | null => {
  for (const category of cats) {
    if (category.type === 'style') {
      return null
    }

    if (category.id === categoryId) {
      return category
    }

    if ('children' in category) {
      const childCategory = getCategoryById(categoryId, category.children)

      if (childCategory) {
        return childCategory
      }
    }
  }

  return null
}

interface Props {
  categoryId: string
}

const CategoryStyleStep = ({ categoryId }: Props) => {
  const activeCategory = getCategoryById(categoryId, categories)

  console.log('ACTIVE CATEGORY', activeCategory)

  return null
}

export default CategoryStyleStep
