import React from 'react'
import ManualQuoter from './ManualQuoter'
import Container from '@components/ui/Container'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import { AuthorizedComponent } from '@lib/auth-rsc'
import { ScopeAction } from '@generated/globalTypes'
import { ScopeResource } from '@generated/types'

interface Props {}

const Page = (props: Props) => {
  return (
    <Container>
      <AuthorizedComponent
        action={ScopeAction.CREATE}
        resource={ScopeResource.ManualQuote}
      >
        <ClosetPageHeader>
          <ClosetPageTitle title="Manual Quote" />
        </ClosetPageHeader>
        <ManualQuoter />
      </AuthorizedComponent>
    </Container>
  )
}

export default Page
