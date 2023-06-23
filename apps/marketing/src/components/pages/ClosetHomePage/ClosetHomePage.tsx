import { gql } from '@apollo/client'
import { Badge, Container } from '@components/ui'
import { ClosetHomePageDesignRequestFragment } from '@generated/ClosetHomePageDesignRequestFragment'
import routes from '@lib/routes'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import ClosetFilters from './ClosetFilters'

interface Props {
  designRequests: ClosetHomePageDesignRequestFragment[]
}

const ClosetHomePage = ({ designRequests }: Props) => {
  return (
    <>
      <Container>
        <ClosetFilters onChange={({ date }) => {}} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {designRequests.map((designRequest, i) => (
            <Link
              key={i}
              className="relative col-span-1 rounded-md overflow-hidden shadow-sm"
              href={routes.internal.closet.designs.show.href({
                designId: designRequest.id,
              })}
            >
              <div className="absolute right-0 top-0">
                <div className="p-2">
                  <Badge
                    label={
                      i % 2 === 0 ? 'Making revisions' : 'Approval requested'
                    }
                    severity={i % 2 === 0 ? 'warning' : 'success'}
                    className="opacity-90"
                  />
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-md">
                <img
                  src={`https://www.stitchi.co/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-ycjcgspsys%2Fimages%2Fstencil%2F300w%2Fattribute_rule_images%2F166304_source_1684166140.jpg&w=1200&q=75`}
                  alt={`Design ${i + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4">
                <h2 className="font-semibold leading-tight">
                  {designRequest.name}
                </h2>
                <span className="text-xs text-gray-500 ">
                  Created {format(new Date(designRequest.createdAt), 'PP')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}

ClosetHomePage.fragments = {
  designRequest: gql`
    fragment ClosetHomePageDesignRequestFragment on DesignRequest {
      id
      name
      createdAt
    }
  `,
}

export default ClosetHomePage
