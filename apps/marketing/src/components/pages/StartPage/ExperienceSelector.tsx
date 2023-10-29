import { Section } from '@components/common'
import Button from '@components/ui/Button'
import React from 'react'

const ExperienceSelector = () => {
  return (
    <Section gutter="md">
      <div className="shadow-md p-2 rounded-xl">
        <Button>Start creating merch</Button>
        <Button>Login</Button>
      </div>
    </Section>
  )
}

export default ExperienceSelector
