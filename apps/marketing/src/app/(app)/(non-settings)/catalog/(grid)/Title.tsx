'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'
import staticData from '@generated/static.json'
import Container from '@components/ui/Container'

const Title = () => {
  const [entity, entitySlug] = useSelectedLayoutSegments()

  let title = ''

  if (entity === 'brands') {
    const brand = staticData.brands.find(
      brand => brand.custom_url.url === `/${entitySlug}/`,
    )

    if (brand) {
      title = brand.name
    }
  } else if (entity === 'categories') {
    const category = staticData.categories.find(
      category => category.custom_url.url === `/${entitySlug}/`,
    )

    if (category) {
      title = category.name
    }
  }

  if (!title.length) {
    return null
  }

  return (
    <Container className="max-w-none">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
        {title}
      </h1>
    </Container>
  )
}

export default Title
