import type { Template } from '../../../..'
import { DesignFactoryDesignRequest } from '../../../../../../design/factory'

export interface Params {
  designRequest: DesignFactoryDesignRequest
}

const create = ({ designRequest }: Params): Template => {
  return {
    web: {
      message: '',
    },
    email: {
      htmlBody: '',
      subject: '',
      textBody: '',
    },
    sms: {
      message: '',
    },
  }
}

export default create
