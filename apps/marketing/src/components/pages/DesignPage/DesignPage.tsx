import { Container } from '@components/ui'
import React from 'react'

import DesignPageHero from './DesignPageHero'
import DesignPageProcess from './DesignPageProcess'

interface DesignPageProps {}

const DesignPage = (props: DesignPageProps) => {
  return (
    <>
      <Container>
        <DesignPageHero />
      </Container>

      <Container>
        <DesignPageProcess />
      </Container>
    </>
  )
}

export default DesignPage
