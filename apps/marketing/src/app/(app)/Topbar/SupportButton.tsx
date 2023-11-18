'use client'

import Button from '@components/ui/ButtonV2/Button'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useIntercom } from 'react-use-intercom'

const SupportButton = () => {
  const { show } = useIntercom()

  return (
    <Button
      variant="ghost"
      onClick={() => show()}
      startIcon={<QuestionMarkCircleIcon className="w-4 h-4" />}
    >
      Support
    </Button>
  )
}

export default SupportButton
