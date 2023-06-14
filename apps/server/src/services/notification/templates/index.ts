import { compile } from 'handlebars'
import { OrderFactoryOrder } from '../../order/factory'
import templates from './templates'

type TemplateObject = { [key: string]: Template | TemplateObject }

export type TemplateId = 'customer.order.confirmed'

interface Template {
  subject: string
  htmlBody: string
}

interface BaseRenderFnParams {
  id: TemplateId
}

interface CustomerOrderConfirmedRenderFnParams extends BaseRenderFnParams {
  id: 'customer.order.confirmed'
  params: {
    order: OrderFactoryOrder
  }
}

type RenderFnParams = CustomerOrderConfirmedRenderFnParams

type RenderFn = (params: RenderFnParams) => Template

export interface TemplateFactory {
  render: RenderFn
}

const templatesFactory: TemplateFactory = {
  render: ({ id }) => {
    const [audience, resource, action] = id.split('.')

    const template = accessDeepObject(templates, [audience, resource, action])

    if (!template) {
      throw new Error(`Unknown templateId: ${id}`)
    }

    const renderSubject = compile(template.subject)
    const renderHtmlBody = compile(template.htmlBody)

    return {
      subject: renderSubject({}),
      htmlBody: renderHtmlBody({}),
    }
  },
}

const accessDeepObject = (
  obj: TemplateObject,
  keys: string[],
): Template | null => {
  if (keys.length === 0) {
    return null
  }

  const [key, ...rest] = keys

  // If the key does not exist in the object, return null
  if (!obj.hasOwnProperty(key)) {
    return null
  }

  // If this is the last key, and it points to a Template, return it
  if (rest.length === 0 && isTemplate(obj[key])) {
    return obj[key] as Template
  }

  // Otherwise, continue searching recursively
  return accessDeepObject(obj[key] as TemplateObject, rest)
}

// Helper function to determine if an object is of type Template
const isTemplate = (obj: any): obj is Template => {
  return obj.hasOwnProperty('subject') && obj.hasOwnProperty('htmlBody')
}

export default templatesFactory
