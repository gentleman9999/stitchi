import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import {
  ClosetTabApprovedDesignRequestGetDataQuery,
  ClosetTabApprovedDesignRequestGetDataQueryVariables,
} from '@generated/ClosetTabApprovedDesignRequestGetDataQuery'
import { notEmpty } from '@utils/typescript'
import React from 'react'
import { useCloset } from '../closet-context'
import ClosetDesignIndexPageApprovedDesignCard from '../ClosetDesignIndexPageApprovedDesignCard'
import Carousel from './Carousel'

interface Props {}

const ClosetTabApprovedDesignRequests = ({}: Props) => {
  const { filters } = useCloset()

  const { data, refetch } = useQuery<
    ClosetTabApprovedDesignRequestGetDataQuery,
    ClosetTabApprovedDesignRequestGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 10,
      filter: {
        where: {
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
          createdAt: {
            gte: filters.date?.gte,
            lte: filters.date?.lte,
          },
        },
      },
    })
  }, [filters, refetch])

  const designProducts =
    data?.viewer?.designProducts.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return (
    <ClosetSection>
      <ClosetSectionHeader>
        <ClosetSectionTitle title="Approved Designs" />
      </ClosetSectionHeader>

      <Carousel>
        <div className="flex gap-6">
          {designProducts.map(design => (
            <div key={design.id} className="w-[230px] shrink-0 flex">
              <ClosetDesignIndexPageApprovedDesignCard design={design} />
            </div>
          ))}
        </div>
      </Carousel>
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
