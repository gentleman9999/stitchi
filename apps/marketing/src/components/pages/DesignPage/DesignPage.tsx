import { Container } from '@components/ui'
import React from 'react'
import DesignPageArtExamples from './DesignPageArtExamples'

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
      <Container>
        <DesignPageArtExamples />
      </Container>
    </>
  )
}

export default DesignPage
