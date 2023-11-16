import Section from '@components/common/Section'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Category {
  id: string
  slug: string | null
  name: string | null
}

interface Props {
  categories: Category[]
}

const DesignLibraryCategoryIndexPage = ({ categories }: Props) => {
  return (
    <Container>
      <Section gutter="md">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-headingDisplay font-bold">
          Custom merch categories
        </h1>
        <ul className="flex flex-wrap gap-4 mt-6">
          {categories.map(category => (
            <li key={category.id} className="border rounded-sm py-2 px-4">
              <Link
                href={
                  category.slug
                    ? routes.internal.lookbook.categories.show.href({
                        categorySlug: category.slug,
                      })
                    : '#'
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  )
}

export default DesignLibraryCategoryIndexPage
