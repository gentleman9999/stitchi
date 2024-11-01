import { logger } from '../../../telemetry'
import { getOrThrow } from '../../../utils'
import { DesignFactoryDesignRequest } from '../../design/factory'
import { OrderFactoryOrder } from '../../order/factory'
import { OrganizationRecord } from '../../organization/db/organization-table'

import { render } from '@react-email/render'
import DesignRequestUserCreatedTemplate from '../../../email-template-composer/emails/design-request-user-created'
import DesignRequestProofUserCreatedTemplate from '../../../email-template-composer/emails/design-request-user-proof-created'
import DesignRequestUserRevisionRequestCreatedTemplate from '../../../email-template-composer/emails/design-request-user-revision-request-created'
import DesignRequestUserRejectedTemplate from '../../../email-template-composer/emails/design-request-user-rejected'
import DesignRequestUserApprovedTemplate from '../../../email-template-composer/emails/design-request-user-approved'
import DesignRequestCommentUserCreatedTemplate from '../../../email-template-composer/emails/design-request-user-comment-created'

import OrderUserConfirmedTemplate from '../../../email-template-composer/emails/order-user-created'
import OrderUserShipmentCreatedTemplate from '../../../email-template-composer/emails/order-user-shipment-created'
import OrderUserCompletedTemplate from '../../../email-template-composer/emails/order-user-completed'

import { MembershipFactoryMembership } from '../../membership/factory/membership'
import { User } from '../../user/serializer'

const appBaseUrl = getOrThrow(
  process.env.STITCHI_MARKETING_APPLICATION_HOST,
  'STITCHI_MARKETING_APPLICATION_HOST',
)

const companyName = getOrThrow(process.env.COMPANY_NAME, 'COMPANY_NAME')

interface Notification {
  email: {
    subject: string
    htmlBody: string
    textBody: string
  } | null
  web: {
    message: string
    ctaText: string | null
    ctaUrl: string | null
  } | null
}

const notifications = {
  'order:created': (params: {
    order: OrderFactoryOrder
    recipient: User
  }): Notification => {
    const template = OrderUserConfirmedTemplate({
      children: null,
      previewText: `We received your order #${params.order.humanReadableId}.`,
      recipient: {
        name: params.recipient.name,
      },
      order: {
        id: params.order.id,
        humanId: params.order.humanReadableId,
        lineItems: params.order.items.map(item => ({
          name: item.title,
          quantity: item.quantity,
          priceCents: item.unitPriceCents,
        })),
      },
    })

    return {
      email: {
        subject: `Order #${params.order.humanReadableId} received`,
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `We received your order #${params.order.humanReadableId}.`,
        ctaText: 'View',
        ctaUrl: params.order.orderUrl,
      },
    }
  },

  'order:inFulfillment': (params: {
    order: OrderFactoryOrder
    recipient: User
  }): Notification => {
    const template = OrderUserShipmentCreatedTemplate({
      children: null,
      previewText: `Your order #${params.order.humanReadableId} is on its way.`,
      recipient: {
        name: params.recipient.name,
      },
      order: {
        id: params.order.id,
        humanId: params.order.humanReadableId,
        lineItems: params.order.items.map(item => ({
          name: item.title,
          quantity: item.quantity,
          priceCents: item.unitPriceCents,
        })),
      },
    })

    return {
      email: {
        subject: `Order #${params.order.humanReadableId} is on its way`,
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `Your order #${params.order.humanReadableId} is on its way.`,
        ctaText: 'View',
        ctaUrl: params.order.orderUrl,
      },
    }
  },

  'order:delivered': (params: {
    order: OrderFactoryOrder
    recipient: User
  }): Notification => {
    const template = OrderUserCompletedTemplate({
      children: null,
      previewText: `Your order #${params.order.humanReadableId} has been delivered.`,
      recipient: {
        name: params.recipient.name,
      },
      order: {
        id: params.order.id,
        humanId: params.order.humanReadableId,
        lineItems: params.order.items.map(item => ({
          name: item.title,
          quantity: item.quantity,
          priceCents: item.unitPriceCents,
        })),
      },
    })

    return {
      email: {
        subject: `Order #${params.order.humanReadableId} has been delivered`,
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `Your order #${params.order.humanReadableId} has been delivered.`,
        ctaText: 'View',
        ctaUrl: params.order.orderUrl,
      },
    }
  },

  'designRequest:submitted': (params: {
    designRequest: DesignFactoryDesignRequest
    designRequester: User
    recipient: User
  }): Notification => {
    const template = DesignRequestUserCreatedTemplate({
      // the email template reads "Hi <name>,"
      recipient: { name: params.recipient.name },
      designRequest: {
        id: params.designRequest.id,
        name: params.designRequest.name,
        creatorName:
          params.designRequester.name || params.designRequester.email || '',
        submittedAt: params.designRequest.createdAt.toISOString(),
        expectedCompletionTime: null,
      },
      previewText: `Your design request ${params.designRequest.name} has been submitted and will be reviewed by an artist shortly.`,
      children: null,
    })

    return {
      email: {
        subject: `Design request submitted`,
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `Your design request ${params.designRequest.name} has been submitted and will be reviewed by an artist shortly.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'designRequest:approved': (params: {
    designRequest: DesignFactoryDesignRequest
    designRequester: User
    recipient: User
  }): Notification => {
    const template = DesignRequestUserApprovedTemplate({
      children: null,
      designRequest: {
        id: params.designRequest.id,
        name: params.designRequest.name,
        creatorName:
          params.designRequester.name || params.designRequester.email || '',
        submittedAt: params.designRequest.createdAt.toISOString(),
        expectedCompletionTime: null,
      },
      recipient: {
        name: params.recipient.name,
      },
      previewText: `Your design request ${params.designRequest.name} has been approved.`,
    })

    return {
      email: {
        subject: 'Design request approved',
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `Your design request ${params.designRequest.name} has been approved.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'designRequest:rejected': (params: {
    designRequest: DesignFactoryDesignRequest
    designRequester: User
    recipient: User
  }): Notification => {
    const template = DesignRequestUserRejectedTemplate({
      children: null,
      reason:
        // TODO: Implement support for adding a reason
        "Please check the design request's conversation for more details.",
      designRequest: {
        id: params.designRequest.id,
        name: params.designRequest.name,
        creatorName:
          params.designRequester.name || params.designRequester.email || '',
        submittedAt: params.designRequest.createdAt.toISOString(),
        expectedCompletionTime: null,
      },
      recipient: {
        name: params.recipient.name,
      },
      previewText: `Your design request ${params.designRequest.name} has been rejected.`,
    })

    return {
      email: {
        subject: 'Design request rejected',
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `Your design request ${params.designRequest.name} has been rejected.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'designRequestProof:created': (params: {
    designRequest: DesignFactoryDesignRequest
    designRequester: User
    recipient: User
  }): Notification => {
    const template = DesignRequestProofUserCreatedTemplate({
      children: null,
      designRequest: {
        id: params.designRequest.id,
        name: params.designRequest.name,
        creatorName:
          params.designRequester.name || params.designRequester.email || '',
        submittedAt: params.designRequest.createdAt.toISOString(),
        expectedCompletionTime: null,
      },
      recipient: {
        name: params.recipient.name,
      },
      previewText: `A design proof was submitted for your design request ${params.designRequest.name}.`,
    })

    return {
      email: {
        subject: 'A design proof was submitted!',
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `A design proof was submitted for your design request ${params.designRequest.name}.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'designRequestRevision:created': (params: {
    designRequest: DesignFactoryDesignRequest
    designRequester: User
    recipient: User
  }): Notification => {
    const template = DesignRequestUserRevisionRequestCreatedTemplate({
      children: null,
      designRequest: {
        id: params.designRequest.id,
        name: params.designRequest.name,
        creatorName:
          params.designRequester.name || params.designRequester.email || '',
        submittedAt: params.designRequest.createdAt.toISOString(),
        expectedCompletionTime: null,
      },
      recipient: {
        name: params.recipient.name,
      },
      previewText: `A revision request was submitted for your design request ${params.designRequest.name}.`,
    })

    return {
      email: {
        subject: 'A revision request was submitted!',
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `A revision request was submitted for your design request ${params.designRequest.name}.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'designRequestComment:created': (params: {
    designRequest: DesignFactoryDesignRequest
    designRequester: User
    recipient: User
  }): Notification => {
    const template = DesignRequestCommentUserCreatedTemplate({
      children: null,
      designRequest: {
        id: params.designRequest.id,
        name: params.designRequest.name,
        creatorName:
          params.designRequester.name || params.designRequester.email || '',
        submittedAt: params.designRequest.createdAt.toISOString(),
        expectedCompletionTime: null,
      },
      recipient: {
        name: params.recipient.name,
      },
      previewText: `A comment was left on your design request ${params.designRequest.name}.`,
    })

    return {
      email: {
        subject: 'A comment was made!',
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `A comment was left on your design request ${params.designRequest.name}.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'membership:invited': (params: {
    invitingUser: User
    membership: MembershipFactoryMembership
    organization: OrganizationRecord
  }): Notification => {
    logger.child({ context: { params } }).info('Sending')
    return {
      email: {
        subject: `${params.invitingUser.name} invited you to join ${params.organization.name} on ${companyName}`,
        htmlBody: `${params.invitingUser.name} invited you to join ${params.organization.name} on ${companyName}. Click <a href="${appBaseUrl}/invites/${params.membership.id}/accept">here</a> to accept the invitation.`,
        textBody: `${params.invitingUser.name} invited you to join ${params.organization.name} on ${companyName}. Click ${appBaseUrl}/invites/${params.membership.id}/accept to accept the invitation.`,
      },
      web: null,
    }
  },
}

export { notifications }
