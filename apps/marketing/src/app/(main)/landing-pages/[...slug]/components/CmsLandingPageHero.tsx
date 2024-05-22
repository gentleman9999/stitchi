import Container from '@components/ui/Container'
import React from 'react'
import CallToActionButton, {
  Props as CallToActionButtonProps,
} from './CallToActionButton'

export interface Props {
  title: string | null
  description: React.ReactNode | null
  ctas: CallToActionButtonProps[]
  overline?: string | null
}

const CmsLandingPageHero = ({ title, overline, description, ctas }: Props) => {
  const [primaryCta, secondaryCta] = ctas

  return (
    <Container>
      <div className="flex justify-center min-h-[90vh] items-center">
        <div className="flex flex-col gap-8">
          {overline ? (
            <div className="text-center text-base sm:text-lg md:text-xl max-w-3xl text-gray-500">
              {overline}
            </div>
          ) : null}

          {title ? (
            <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-semibold font-headingDisplay uppercase max-w-3xl">
              {title}
            </h1>
          ) : null}

          {description ? (
            <div className="text-center text-base sm:text-lg md:text-xl max-w-3xl text-gray-800">
              {description}
            </div>
          ) : null}

          {primaryCta ? (
            <div className="flex gap-4 justify-center flex-wrap mt-12">
              <CallToActionButton size="xl" {...primaryCta} />
              {secondaryCta ? (
                <CallToActionButton
                  size="2xl"
                  variant="ghost"
                  {...secondaryCta}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  )
}

export default CmsLandingPageHero
