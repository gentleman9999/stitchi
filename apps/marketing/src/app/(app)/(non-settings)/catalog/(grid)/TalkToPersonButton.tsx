'use client'

import React from 'react'
import { useIntercom } from 'react-use-intercom'
import Button from '@components/ui/ButtonV2/Button'
import { ArrowRight } from 'icons'

const TalkToPersonButton = () => {
  const { showNewMessage } = useIntercom()

  return (
    <Button
      endIcon={<ArrowRight strokeWidth="2" />}
      variant="naked"
      onClick={() => showNewMessage()}
    >
      Talk to a Specialist
    </Button>
  )
}

export default TalkToPersonButton
