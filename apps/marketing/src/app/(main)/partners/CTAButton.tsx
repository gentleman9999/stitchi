'use client'

import Button from '@components/ui/ButtonV2/Button'
import { INTERCOM_SURVEY_ID__PARTNER_REQUEST } from '@lib/constants'
import { useIntercom } from 'react-use-intercom'

const CTAButton = () => {
  const { startSurvey, showNewMessage } = useIntercom()

  return (
    <Button
      color="brandPrimary"
      size="2xl"
      onClick={() => showNewMessage("I'm interested in becoming a partner")}
    >
      Start earning
    </Button>
  )
}

export default CTAButton
