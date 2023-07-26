import { DesignFactoryDesignRequest } from '../../design/factory'
import templates from './templates'

export interface Template {
  web: {
    message: string
  }
  email?: {
    subject: string
    htmlBody: string
    textBody?: string
  }
  sms?: {
    body: string
  }
}

type TemplateType =
  // | 'design_request.submitted.user'
  'design_request.submitted.admin'

type MakeTemplatesFn = <T>(params: T) => Template

const makeTemplates = <T extends MakeTemplatesFn>(): Record<
  TemplateType,
  T
> => {
  return {
    'design_request.submitted.admin': templates.designRequest.submitted.admin,
    // 'design_request.submitted.user': ({
    //   designRequest,
    // }: {
    //   designRequest: DesignFactoryDesignRequest
    // }) => {
    //   return {
    //     web: {},
    //   }
    // },
  }
}

export default makeTemplates
