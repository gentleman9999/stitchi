import Button from '@components/ui/ButtonV2/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { categories, Category, Style } from '../wizard-data'

const schema = yup.object().shape({
  value: yup.mixed().oneOf(['has_product', 'has_no_product']),
})

type FormValues = yup.InferType<typeof schema>

interface Props {}

const CategoryStep = ({}: Props) => {
  const [parentCategory, setParentCategory] = React.useState<Category | null>(
    null,
  )

  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async data => {
    setLoading(true)

    setLoading(false)
  })

  const handleCategoryClick = (category: Category | Style) => {
    if ('children' in category) {
      setParentCategory(category)
    } else {
      router.push(
        routes.internal.catalog.wizard.categories.styles.href({
          categoryId: category.id,
        }),
      )
    }
  }

  const categoriesOrStylesToDisplay =
    parentCategory && 'children' in parentCategory
      ? parentCategory.children
      : categories

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-20">
      <p className="text-4xl font-normal text-center">
        We offer a wide range of products. Choose a template that will be used
        as the base of your design.
      </p>

      <div className="flex flex-col gap-20 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categoriesOrStylesToDisplay.map(categoryOrStyle => (
            <CategoryOrStyle
              key={categoryOrStyle.id}
              categoryOrStyle={categoryOrStyle}
              onClick={() => handleCategoryClick(categoryOrStyle)}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <Button size="xl" variant="naked" onClick={() => router.back()}>
            Previous
          </Button>
          <Button type="submit" size="xl" loading={loading}>
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}

const CategoryOrStyle = ({
  categoryOrStyle,
  onClick,
}: {
  categoryOrStyle: Category | Style
  onClick: () => void
}) => {
  return (
    <button className="border p-4 rounded-md" onClick={onClick}>
      {categoryOrStyle.label}
    </button>
  )
}

export default CategoryStep
