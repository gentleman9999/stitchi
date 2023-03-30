import { FragmentType, getFragmentData, gql } from '@/__generated__'
import React from 'react'
import CompanyCard from './CompanyCard'

interface Props {
  loading: boolean
  companies?: FragmentType<typeof CompanyCardGridCompany>[]
}

export default function CompanyCardGrid(props: Props) {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {props.companies?.map(companyData => {
        const company = getFragmentData(CompanyCardGridCompany, companyData)
        return (
          <CompanyCard component="li" companyData={company} key={company.id} />
        )
      })}
      {props.loading ? (
        <>
          {Array.from(new Array(4)).map((_, i) => (
            <CompanyCard component="li" key={i} loading />
          ))}
        </>
      ) : null}

      {/* TODO: No companies state */}
    </ul>
  )
}

export const CompanyCardGridCompany = gql(/* GraphQL */ `
  fragment CompanyCardGridCompany on GlossaryEntryRecord {
    id
    ...CompanyCardCompany
  }
`)
