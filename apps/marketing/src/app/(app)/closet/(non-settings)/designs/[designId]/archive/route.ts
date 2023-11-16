import { gql } from '@apollo/client'
import {
  DesignRequestShowPageArhiveDesignRequest,
  DesignRequestShowPageArhiveDesignRequestVariables,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { Logger } from 'next-axiom'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  context: {
    params: {
      designId: string
    }
  },
) => {
  const log = new Logger()
  const client = await getClient()

  const { data } = await client.mutate<
    DesignRequestShowPageArhiveDesignRequest,
    DesignRequestShowPageArhiveDesignRequestVariables
  >({
    mutation: ARCHIVE_DESIGN_REQUEST,
    variables: {
      input: {
        designRequestId: context.params.designId,
      },
    },
  })

  const { designRequest } = data?.designRequestArchive || {}

  if (!designRequest) {
    log.error('Unable to archive design request', {
      context: { designRequest },
    })

    return NextResponse.redirect(
      new URL(
        routes.internal.closet.designs.show.href({
          designId: context.params.designId,
        }),
        request.url,
      ),
    )
  }

  return NextResponse.redirect(
    new URL(routes.internal.closet.designs.href(), request.url),
  )
}

const ARCHIVE_DESIGN_REQUEST = gql`
  mutation DesignRequestShowPageArhiveDesignRequest(
    $input: DesignRequestArchiveInput!
  ) {
    designRequestArchive(input: $input) {
      designRequest {
        id
      }
    }
  }
`
