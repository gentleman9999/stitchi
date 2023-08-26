import { DesignFactoryDesignRequest } from '../../design/factory'
import { OrderFactoryOrder } from '../../order/factory'

const templates = {
  'order.confirmed.customer': {
    render: ({ order }: { order: OrderFactoryOrder }) => {},
  },
  'design_request.created.customer': {
    render: ({
      designRequest,
    }: {
      designRequest: DesignFactoryDesignRequest
    }) => {},
  },
}

export type Templates = typeof templates

const makeTemplates = (): Templates => {
  return templates
}

export { makeTemplates }
