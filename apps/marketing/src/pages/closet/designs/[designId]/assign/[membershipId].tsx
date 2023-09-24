import { gql } from '@apollo/client'
import { ClosetLayout } from '@components/layout'
import {
  DesignAssignPageAssignDesignMutation,
  DesignAssignPageAssignDesignMutationVariables,
} from '@generated/DesignAssignPageAssignDesignMutation'
import { initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (typeof ctx.query.designId !== 'string') {
    return {
      notFound: true,
    }
  }

  if (typeof ctx.query.membershipId !== 'string') {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo(undefined, ctx)

  await client.mutate<
    DesignAssignPageAssignDesignMutation,
    DesignAssignPageAssignDesignMutationVariables
  >({
    mutation: ASSIGN_DESIGN,
    variables: {
      input: {
        designRequestId: ctx.query.designId,
        membershipId: ctx.query.membershipId,
      },
    },
  })

  return {
    redirect: {
      destination: routes.internal.closet.designs.show.href({
        designId: ctx.query.designId,
      }),
      permanent: false,
    },
  }
}

const Page = () => {
  return null
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page

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
