import { Section } from '@components/common'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import { Container } from '@components/ui'
import React from 'react'
import ProgressBar from './ProgressBar'

interface Props {}

const ClosetDesignShowPage = (props: Props) => {
  return (
    <Container>
      <ClosetPageTitle
        title={
          <>
            Design <span className="text-gray-400">Special Design Name</span>
          </>
        }
      />
      <Section>
        <ProgressBar step={0} />
      </Section>
    </Container>
  )
}

export default ClosetDesignShowPage
