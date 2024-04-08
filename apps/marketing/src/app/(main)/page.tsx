import React from 'react'
import Container from '@components/ui/Container'
import { Section } from '@components/common'
import CustomerLogoBanner from '@components/common/CustomerLogoBanner'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import routes from '@lib/routes'

import categoryTShirt from '../../../public/category-t-shirt.jpg'
import categorySweatshirt from '../../../public/category-sweatshirt.jpg'
import categoryHeadwear from '../../../public/category-hat.jpg'
import categoryBags from '../../../public/category-bags.jpg'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import HomePageHero from './HomePage/HomePageHero'
import HomePageSolutions from './HomePage/HomePageSolutions'
import HomePageTestimonial from './HomePage/HomePageTestimonial'

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

const Home = () => {
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
                    className="h-full flex flex-col items-center border rounded-sm border-midnight overflow-hidden"
                    href={routes.internal.catalog.category.show.href({
                      categorySlug: category.slug,
                    })}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      className="w-full aspect-[3/2]"
                    />
                    <div className="p-4 bg-midnight hover:bg-turquoise text-gray-100 hover:text-midnight transition-colors w-full flex-1 flex items-center">
                      <span className="text-sm font-semibold">
                        {category.title}
                      </span>
                      <ArrowRightIcon className="w-4 h-4 ml-auto text-midnight" />
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

        <div className="bg-midnight">
          <Container>
            <Section
              gutter="lg"
              className="flex flex-col items-center text-center"
            >
              <span className="uppercase text-sm bg-primary px-2 py-1">
                Built for scale
              </span>
              <h2 className="font-headingDisplay uppercase text-4xl sm:text-5xl md:text-6xl font-bold mt-4 text-white">
                Merch is awesome. <br />
                Managing it sucks.
              </h2>
              <p className="mt-6 text-gray-50/80  max-w-md">
                Develop quality branded merchandise experiences with a partner
                you can depend on every step of the way.
              </p>

              <Button
                className="mt-12"
                size="2xl"
                Component={Link}
                variant="flat"
                color="brandPrimary"
                href={routes.internal.getStarted.href()}
                endIcon={<ArrowRightIcon className="w-4 h-4" />}
              >
                Simplify merch
              </Button>
            </Section>
          </Container>
        </div>

        <HomePageTestimonial />
      </div>
    </>
  )
}

export default Home
