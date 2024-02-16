import { ArrowRightIcon } from '@heroicons/react/20/solid'
import React from 'react'
import CallToActionButton from './CallToActionButton'
import HeroIcon from './HeroIcon'

interface Feature {
  name: string
  shortDescription?: string | null
  iconTag?: string | null
  ctaText: string | null
  ctaUrl: string | null
}

export interface Props {
  features: Feature[]
}

const FeatureGrid = (props: Props) => {
  const { features } = props

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-3">
        {features.map((feature, index) => {
          const { name, shortDescription, iconTag } = feature

          return (
            <Feature
              key={index}
              name={name}
              shortDescription={shortDescription}
              iconTag={iconTag}
              ctaText={feature.ctaText}
              ctaUrl={feature.ctaUrl}
            />
          )
        })}
      </div>
    </div>
  )
}

const Feature = (props: Feature) => {
  const { name, shortDescription, iconTag, ctaText, ctaUrl } = props

  return (
    <div className="flex flex-col gap-4 border rounded-sm p-4">
      <div className="flex gap-4">
        {iconTag ? (
          <HeroIcon
            icon={iconTag}
            className="w-4 h-4 md:w-5 md:h-5 text-primary"
          />
        ) : null}
        <div className="font-semibold text-base md:text-lg leading-none">
          {name}
        </div>
      </div>
      <div>
        {shortDescription ? (
          <div
            className="text-sm md:text-base text-gray-500"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
        ) : null}
      </div>
      {ctaText && ctaUrl ? (
        <div className="flex-1 flex flex-col items-start justify-end">
          <CallToActionButton
            url={ctaUrl}
            variant="naked"
            endIcon={<ArrowRightIcon className="w-4 h-4" />}
            size="sm"
          >
            {ctaText}
          </CallToActionButton>
        </div>
      ) : null}
    </div>
  )
}

export default FeatureGrid
