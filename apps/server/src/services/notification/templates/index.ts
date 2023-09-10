import { User } from 'auth0'
import { DesignFactoryDesignRequest } from '../../design/factory'
import { MembershipFactoryMembership } from '../../membership/factory/membership'
import { OrderFactoryOrder } from '../../order/factory'

interface Notification {
  email: {
    subject: string
    htmlBody: string
    textBody: string
  }
  web: {
    message: string
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
      },
    }
  },
}

export { notifications }
