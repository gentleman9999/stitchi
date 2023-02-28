'use client'

import { CompanyCard } from '@/components/common'
import SearchBar from '@/components/common/SearchBar'
import { Container } from '@/components/ui'
import Link from 'next/link'
import { categories, companies } from './mock'

export default function Home() {
  return (
    <Container>
      <div className="py-20">
        <h1 className="text-5xl font-bold max-w-2xl leading-tight">
          Discover the internet&apos;s best merch and how its made
        </h1>
      </div>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-12">
          <SearchBar onSubmit={() => {}} loading={false} />
          <ul className="flex gap-4">
            {categories.map(category => {
              return (
                <li key={category.slug}>
                  <Link
                    href={`#${category.slug}`}
                    className="py-4 px-4 rounded-md border-2 border-gray-400 font-semibold hover:border-gray-600 transition-all"
                  >
                    {category.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <ul>
            {companies.map(company => {
              return (
                <CompanyCard
                  component="li"
                  company={company}
                  key={company.id}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </Container>
  )
}
