import { gql } from '@apollo/client'
import {
  DesignAssignPageAssignDesignMutation,
  DesignAssignPageAssignDesignMutationVariables,
} from '@generated/DesignAssignPageAssignDesignMutation'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: { designId: string; membershipId: string } },
) {
  const { designId, membershipId } = context.params

  const client = await getClient()

  await client.mutate<
    DesignAssignPageAssignDesignMutation,
    DesignAssignPageAssignDesignMutationVariables
  >({
    mutation: ASSIGN_DESIGN,
    variables: {
      input: {
        designRequestId: designId,
        membershipId: membershipId,
      },
    },
  })

  return NextResponse.redirect(
    new URL(
      routes.internal.closet.designs.show.href({
        designId,
      }),
      request.url,
    ),
  )
}

const ASSIGN_DESIGN = gql`
  mutation DesignAssignPageAssignDesignMutation(
    $input: DesignRequestAssignInput!
  ) {
    designRequestAssign(input: $input) {
      designRequest {
        id
      }
    }
  }
`
