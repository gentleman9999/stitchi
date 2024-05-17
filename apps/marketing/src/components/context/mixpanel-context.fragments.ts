import { gql } from '@apollo/client'

export const fragments = {
  viewer: gql`
    fragment MixpanelContextViewerFragment on Membership {
      id
      organization {
        id
        name
      }
      user {
        createdAt
        id

        intercomUserHash
        email
        name
        phoneNumber
        picture
      }
    }
  `,
}
