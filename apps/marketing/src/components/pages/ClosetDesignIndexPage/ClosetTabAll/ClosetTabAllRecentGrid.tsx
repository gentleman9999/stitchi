import { gql, useQuery } from '@apollo/client'
import { ClosetTabAllRecentGridGetDataQuery } from '@generated/ClosetTabAllRecentGridGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'

interface Props {}

const ClosetTabAllRecentGrid = ({}: Props) => {
  const { data, loading } =
    useQuery<ClosetTabAllRecentGridGetDataQuery>(GET_DATA)

  const designRequests = data?.viewer?.designRequests?.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return (
    <div className="flex gap-6 overflow-x-scroll">
      {designRequests?.map(designRequest => {
        const { previewImage } = designRequest
        return (
          <div key={designRequest.id} className="shrink-0 w-40">
            {previewImage ? (
              <img
                src={previewImage.url}
                alt={previewImage.name}
                width={previewImage.width}
                height={previewImage.height}
                className="aspect-square"
              />
            ) : (
              <div className="aspect-square bg-gray-200" />
            )}
          </div>
        )
      })}
    </div>
  )
}

const GET_DATA = gql`
  query ClosetTabAllRecentGridGetDataQuery {
    viewer {
      designRequests(first: 10) {
        edges {
          node {
            id
            name
            previewImage {
              id
              width
              height
              url
              name
            }
          }
        }
      }
    }
  }
`

export default ClosetTabAllRecentGrid
