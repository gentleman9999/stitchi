'use client'

import { CompanyCard } from '@/components/common'
import SearchBar from '@/components/common/SearchBar'
import { Container } from '@/components/ui'
import Link from 'next/link'
import React from 'react'
import { useIntersectionObserver } from '@/hooks'
import { categories, companies as mockCompanies } from './mock'
import { Adjustments } from 'icons'
import FilterDialog from './FilterDialog'

const categoryButtonClassName =
  'block py-4 px-4 rounded-md border border-gray-400 font-semibold hover:border-gray-600 transition-all'

export default function Home() {
  const directoryEndRef = React.useRef<HTMLDivElement>(null)
  const [loading, setLoading] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false)
  const [companies, setCompanies] = React.useState(mockCompanies)
  const directoryEnd = useIntersectionObserver(directoryEndRef, {})

  React.useEffect(() => {
    if (loading) return
    if (directoryEnd?.isIntersecting) {
      fetchMore()
    }
  }, [directoryEnd?.isIntersecting, loading])

  const fetchMore = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setCompanies(prev => [...prev, ...mockCompanies])
    }, 1500)
  }

  return (
    <>
      <FilterDialog open={showFilters} onOpenChange={setShowFilters} />
      <Container>
        <div className="py-20">
          <h1 className="text-7xl font-bold max-w-2xl font-headingDisplay">
            Discover the internet&apos;s best merch and how its made
          </h1>
        </div>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-12">
            <SearchBar onSubmit={() => {}} loading={false} />
            <ul className="flex justify-between gap-4">
              {categories.map(category => {
                return (
                  <li key={category.slug}>
                    <Link
                      href={`#${category.slug}`}
                      className={categoryButtonClassName}
                    >
                      {category.label}
                    </Link>
                  </li>
                )
              })}
              <li>
                <button
                  onClick={() => setShowFilters(true)}
                  className={`${categoryButtonClassName} flex items-center gap-2`}
                >
                  <Adjustments height={20} /> Filters
                </button>
              </li>
            </ul>
          </div>
          <div>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {companies.map(company => {
                return (
                  <CompanyCard
                    component="li"
                    company={company}
                    key={company.id}
                  />
                )
              })}
              {loading ? (
                <>
                  {Array.from(new Array(4)).map((_, i) => (
                    <CompanyCard component="li" key={i} loading />
                  ))}
                </>
              ) : null}
            </ul>
          </div>
          <div ref={directoryEndRef} />
        </div>
      </Container>
    </>
  )
}
