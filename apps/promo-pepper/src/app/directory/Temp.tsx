'use client'
import React from 'react'
import { CompanyCard } from '@/components/common'
import SearchBar from '@/components/common/SearchBar'
import { Container } from '@/components/ui'
import { useIntersectionObserver } from '@/hooks'
import { companies as mockCompanies } from '../mock'
import Filters from './Filters'

interface Props {}

export default function Temp() {
  const directoryEndRef = React.useRef<HTMLDivElement>(null)
  const [loading, setLoading] = React.useState(false)
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
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-12">
          <SearchBar onSubmit={() => {}} loading={false} />
          <Filters />
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
    </>
  )
}
