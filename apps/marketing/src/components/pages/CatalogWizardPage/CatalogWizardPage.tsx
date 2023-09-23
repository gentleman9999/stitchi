import UserAvatar from '@components/common/UserAvatar'
import { Container } from '@components/ui'
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
      <div className="absolute top-6 left-0 right-0 flex justify-center z-50">
        <UserAvatar
          width="w-16"
          height="h-16"
          user={{
            name: 'Linda',
            picture:
              'https://img.freepik.com/free-photo/close-up-displeased-young-bearded-man-glasses-wearing-colorful-shirt-isolated-pink-background-looking-camera-with-raised-eyebrow-people-emotions-concept_295783-2777.jpg',
          }}
        />
      </div>

      <Container className="!max-w-3xl mt-20">
        <Step />
      </Container>
    </div>
  )
}

export default CatalogWizardPage
