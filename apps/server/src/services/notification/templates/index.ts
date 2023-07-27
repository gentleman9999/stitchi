import { DesignFactoryDesignRequest } from '../../design/factory'
import templates from './templates'
import {
  DesignRequestSubmittedAdminParams,
  DesignRequestSubmittedUserParams,
} from './templates/design-request/submitted'

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
    message: string
  }
}

type TemplateType =
  | 'design_request.submitted.user'
  | 'design_request.submitted.admin'

type TypeToParams = {
  'design_request.submitted.admin': DesignRequestSubmittedAdminParams
  'design_request.submitted.user': DesignRequestSubmittedUserParams
}

type Params<T extends TemplateType> = TypeToParams[T]

type MakeTemplatesFn = <T extends TemplateType>(params: Params<T>) => Template

const makeTemplates = (): Record<TemplateType, MakeTemplatesFn> => {
  return {
    'design_request.submitted.admin': templates.designRequest.submitted.admin,
    'design_request.submitted.user': templates.designRequest.submitted.user,
  }
}

export type Templates = ReturnType<typeof makeTemplates>

export default makeTemplates
