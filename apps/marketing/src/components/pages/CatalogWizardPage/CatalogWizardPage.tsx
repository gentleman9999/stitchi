import UserAvatar from '@components/common/UserAvatar'
import React from 'react'
import CategoryStep from './CategoryStep'
import CategoryStyleStep from './CategoryStyleStep'
import WelcomePage from './WelcomeStep'

export type Step = 'welcome' | 'choose-product-category'

interface Props {
  path: string[]
}

const CatalogWizardPage = ({ path }: Props) => {
  const Step = () => {
    switch (path[0]) {
      case 'welcome':
        return <WelcomePage />
      case 'categories':
        if (path[1]) {
          return <CategoryStyleStep categoryId={path[1]} />
        } else {
          return <CategoryStep />
        }
      default:
        console.error(`Unknown path section: ${path[0]}`)
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

      <div className="max-w-3xl mt-20">
        <Step />
      </div>
    </div>
  )
}

export default CatalogWizardPage
