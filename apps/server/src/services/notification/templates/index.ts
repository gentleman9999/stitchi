import { User } from 'auth0'
import { getOrThrow } from '../../../utils'
import { DesignFactoryDesignRequest } from '../../design/factory'
import { MembershipFactoryMembership } from '../../membership/factory/membership'
import { OrderFactoryOrder } from '../../order/factory'

const appBaseUrl = getOrThrow(
  process.env.STITCHI_MARKETING_APPLICATION_HOST,
  'STITCHI_MARKETING_APPLICATION_HOST',
)

interface Notification {
  email: {
    subject: string
    htmlBody: string
    textBody: string
  }
  web: {
    message: string
    ctaText: string | null
    ctaUrl: string | null
  }
}

const notifications = {
  'order:confirmed': (params: {
    order: OrderFactoryOrder
    membership: MembershipFactoryMembership
    user: User
  }): Notification => {
    return {
      email: {
        subject: `Order #${params.order.humanReadableId} confirmed`,
        htmlBody: `Your order #${params.order.humanReadableId} is confirmed.`,
        textBody: `Your order #${params.order.humanReadableId} is confirmed.`,
      },
      web: {
        message: `Your order #${params.order.humanReadableId} is confirmed.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/orders/${params.order.id}`,
      },
    }
  },

  'designRequest:submitted': (params: {
    designRequest: DesignFactoryDesignRequest
    membership: MembershipFactoryMembership
    user: User
  }): Notification => {
    return {
      email: {
        subject: `Design request submitted`,
        htmlBody: `Your design request ${params.designRequest.name} has been submitted and will be reviewed by an artist shortly.`,
        textBody: `Your design request ${params.designRequest.name} has been submitted and will be reviewed by an artist shortly.`,
      },
      web: {
        message: `Your design request ${params.designRequest.name} has been submitted and will be reviewed by an artist shortly.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/design-requests/${params.designRequest.id}`,
      },
    }
  },

  'designRequestProof:created': (params: {
    designRequest: DesignFactoryDesignRequest
    membership: MembershipFactoryMembership
    user: User
  }): Notification => {
    return {
      email: {
        subject: 'A design proof was submitted!',
        htmlBody: `A design proof was submitted for your design request ${params.designRequest.name}.`,
        textBody: `A design proof was submitted for your design request ${params.designRequest.name}.`,
      },
      web: {
        message: `A design proof was submitted for your design request ${params.designRequest.name}.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/design-requests/${params.designRequest.id}`,
      },
    }
  },
}

export { notifications }
