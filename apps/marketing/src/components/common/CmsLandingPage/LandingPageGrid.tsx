import React from 'react'

interface LandingPage {
  href: string
  title: string
  subtitle?: string
}

export interface Props {
  landingPages: LandingPage[]
}

const LandingPageGrid = (props: Props) => {
  const { landingPages } = props

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {landingPages.map(landingPage => (
        <a
          key={landingPage.href}
          href={landingPage.href}
          className="bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <h3 className="text-lg font-bold">{landingPage.title}</h3>

            {landingPage.subtitle ? (
              <p className="mt-2 text-sm text-gray-600">
                {landingPage.subtitle}
              </p>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  )
}

export default LandingPageGrid
