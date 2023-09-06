import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import {
  ClosetTabApprovedDesignRequestGetDataQuery,
  ClosetTabApprovedDesignRequestGetDataQueryVariables,
} from '@generated/ClosetTabApprovedDesignRequestGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from '../closet-context'
import ClosetDesignIndexPageApprovedDesignCard from '../ClosetDesignIndexPageApprovedDesignCard'
import Carousel from './Carousel'
import EmptyState from './EmptyState'

interface Props {}

const ClosetTabApprovedDesignRequests = ({}: Props) => {
  const { filters } = useCloset()

  const { data, loading, refetch } = useQuery<
    ClosetTabApprovedDesignRequestGetDataQuery,
    ClosetTabApprovedDesignRequestGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 10,
      filter: {
        where: {
          // userId: { equals: filters.user || undefined },
          createdAt: {
            gte: filters.date?.gte,
            lte: filters.date?.lte,
          },
        },
      },
    },
  })

  React.useEffect(() => {
    refetch({
      filter: {
        where: {
          // userId: { equals: filters.user || undefined },
          createdAt: {
            gte: filters.date?.gte,
            lte: filters.date?.lte,
          },
        },
      },
    })
  }, [filters, refetch])

  const { viewer } = data || {}

  const designProducts =
    viewer?.designProducts.edges?.map(edge => edge?.node).filter(notEmpty) || []

  return (
    <ClosetSection>
      <ClosetSectionHeader>
        <ClosetSectionTitle title="Approved Designs" />
      </ClosetSectionHeader>

      {loading || designProducts.length ? (
        <Carousel>
          <div className="flex gap-6">
            {loading ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-[230px] shrink-0 flex">
                    <ClosetDesignIndexPageApprovedDesignCard
                      loading={true}
                      design={null}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {designProducts.map(design => (
                  <div key={design.id} className="w-[230px] shrink-0 flex">
                    <ClosetDesignIndexPageApprovedDesignCard
                      design={design}
                      loading={false}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </Carousel>
      ) : (
        <EmptyState />
      )}
    </ClosetSection>
  )
}

const GET_DATA = gql`
  ${ClosetDesignIndexPageApprovedDesignCard.fragments.designProduct}
  query ClosetTabApprovedDesignRequestGetDataQuery(
    $first: Int!
    $after: String
    $filter: MembershipDesignProductsFilterInput
  ) {
    viewer {
      id
      hasDesignProducts
      designProducts(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            ...ClosetDesignIndexPageApprovedDesignCardDesignProductFragment
          }
        }
      }
    }
  }
`

export default ClosetTabApprovedDesignRequests
