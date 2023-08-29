import { DesignFactoryDesignRequest } from '../../design/factory'
import { OrderFactoryOrder } from '../../order/factory'
import OrderCreatedUserTemplate from '../../../email-template-composer/emails/order-user-created'
import { render } from '@react-email/render'
import { User } from 'auth0'

interface Template {
  web: {
    message: string
  }
  email: {
    subject: string
    htmlBody: string
    textBody: string
  }
}

interface TemplateParams {
  'order.confirmed.customer': React.ComponentProps<
    typeof OrderCreatedUserTemplate
  >
  // 'design_request.created.customer': {
  //   designRequest: DesignFactoryDesignRequest
  // }
}

// Define a generic type for the render function.
type RenderFn<Params> = (params: Params) => Template

type TMap = {
  [K in keyof TemplateParams]: {
    render: RenderFn<TemplateParams[K]>
  }
}

const templateMap: TMap = {
  'order.confirmed.customer': {
    render: ({ order, recipient }) => {
      const Template = OrderCreatedUserTemplate({
        order,
        recipient,
      })

      return {
        email: {
          subject: `Order #${order.humanId} confirmed`,
          htmlBody: render(Template),
          textBody: render(Template, {
            plainText: true,
          }),
        },
        web: {
          message: '',
        },
      }
    },
  },
  // 'design_request.created.customer': {
  //   render: ({ designRequest }) => {
  //     return {
  //       email: {},
  //       web: {},
  //     }
  //   },
  // },
}

export type TemplateMap = typeof templateMap

const makeTemplateMap = (): TemplateMap => {
  return templateMap
}

export { makeTemplateMap }
