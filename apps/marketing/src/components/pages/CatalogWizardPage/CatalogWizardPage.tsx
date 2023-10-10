import UserAvatar from '@components/common/UserAvatar'
import { Container } from '@components/ui'
import { SUPPORT_PERSON_NAME, SUPPORT_PERSON_PICTURE } from '@lib/constants'
import { useLogger } from 'next-axiom'
import React from 'react'
import CategoryStepNew from './CategoryStepNew'
import WelcomePage from './WelcomeStep'

export type Step = 'welcome' | 'choose-product-category'

interface Props {
  path: string[]
}

const CatalogWizardPage = ({ path }: Props) => {
  const logger = useLogger()

  const Step = () => {
    switch (path[0]) {
      case 'welcome':
        return <WelcomePage />
      case 'categories':
        return <CategoryStepNew />

      default:
        logger.error(`Unknown path section: ${path[0]}`)
        return null
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-6 inset-y-1/2 w-16 flex justify-center z-50">
        <UserAvatar
          width="w-16"
          height="h-16"
          user={{
            name: SUPPORT_PERSON_NAME,
            picture: SUPPORT_PERSON_PICTURE,
          }}
        />
      </div>

      <Container className="!max-w-3xl mt-20 mb-10">
        <Step />
      </Container>
    </div>
  )
}

export default CatalogWizardPage
