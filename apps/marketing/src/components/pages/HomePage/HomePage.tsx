import React from 'react'
import Container from '@components/ui/Container'
import HomePageHero from './HomePageHero'
import HomePageTestimonial from './HomePageTestimonial'
import { Section } from '@components/common'
import CustomerLogoBanner from '@components/common/CustomerLogoBanner'
import HomePageSolutions from './HomePageSolutions'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import routes from '@lib/routes'

import categoryTShirt from '../../../../public/category-t-shirt.jpg'
import categorySweatshirt from '../../../../public/category-sweatshirt.jpg'
import categoryHeadwear from '../../../../public/category-hat.jpg'
import categoryBags from '../../../../public/category-bags.jpg'
import Image from 'next/image'

const featuredCategories = [
  {
    slug: 'apparel/t-shirts',
    title: 'T-Shirts & Tops',
    image: categoryTShirt,
  },
  {
    slug: 'apparel/sweatshirts-fleece',
    title: 'Sweatshirts & Fleece',
    image: categorySweatshirt,
  },
  {
    slug: 'apparel/headwear',
    title: 'Headwear',
    image: categoryHeadwear,
  },
  {
    slug: 'accessories/bags',
    title: 'Bags',
    image: categoryBags,
  },
]

export interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  return (
    <>
      <HomePageHero />

      <Section>
        <CustomerLogoBanner />
      </Section>

      <div className="divide-y divide-black">
        <Container>
          <Section className="py-4">
            <h2 className="sr-only">Featured collections</h2>

            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featuredCategories.map(category => (
                <li key={category.slug} className="col-span-1">
                  <Link
                    className="h-full flex flex-col items-center border rounded-lg border-black overflow-hidden"
                    href={routes.internal.catalog.category.show.href({
                      categorySlug: category.slug,
                    })}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      className="w-full aspect-[3/2]"
                    />
                    <div className="p-4 bg-primary-light w-full flex-1 flex items-center">
                      <span className="text-sm text-gray-900 hover:text-gray-900 font-semibold">
                        {category.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </Container>

        <Section>
          <h2 className="sr-only">Solution Overview</h2>
          <HomePageSolutions />
        </Section>

        <div className="bg-primary-light">
          <Container>
            <Section
              gutter="lg"
              className="flex flex-col items-center text-center"
            >
              <span className="uppercase text-sm font-light">
                Built for scale
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 ">
                Merch is awesome. <br />
                Managing it sucks.
              </h2>
              <p className="mt-6 text-gray-700  max-w-md">
                Develop quality branded merchandise experiences with a partner
                you can depend on every step of the way.
              </p>

              <Button
                className="mt-6"
                size="xl"
                Component={Link}
                variant="flat"
                href={routes.internal.getStarted.href()}
              >
                Make merch fun
              </Button>
            </Section>
          </Container>
        </div>

        <HomePageTestimonial />
      </div>
    </>
  )
}

export default HomePage
