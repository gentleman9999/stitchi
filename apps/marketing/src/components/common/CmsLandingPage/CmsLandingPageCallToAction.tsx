import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { CmsLandingPageCallToActionCallToActionFragment } from '@generated/CmsLandingPageCallToActionCallToActionFragment'
import React from 'react'
import Section from '../Section'
import CallToActionButton from './CallToActionButton'

interface Props {
  callToAction: CmsLandingPageCallToActionCallToActionFragment
}

const CmsLandingPageCallToAction = ({ callToAction }: Props) => {
  const { title, description, actions } = callToAction

  return (
    <div className="bg-primary">
      <Container>
        <Section gutter="lg" className="flex flex-col items-center gap-4">
          {title ? (
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">
              {title}
            </h2>
          ) : null}
          {description ? (
            <div
              className="text-center text-base md:text-lg max-w-2xl text-gray-900/50"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
          <div className="flex gap-6 mt-4 flex-wrap justify-center">
            {actions.map((action, i) => {
              return action.url && action.label ? (
                <CallToActionButton
                  key={action.label}
                  url={action.url}
                  size="xl"
                  variant={i === 0 ? 'flat' : 'naked'}
                  iconId={action.icon[0]?.tag}
                >
                  {action.label}
                </CallToActionButton>
              ) : null
            })}
          </div>
        </Section>
      </Container>
    </div>
  )
}

CmsLandingPageCallToAction.fragments = {
  callToAction: gql`
    fragment CmsLandingPageCallToActionCallToActionFragment on PageCallToActionRecord {
      id
      title
      description
      actions {
        label
        url
        icon {
          id
          tag
        }
      }
    }
  `,
}

export default CmsLandingPageCallToAction
