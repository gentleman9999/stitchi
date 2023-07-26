import type { Template } from '../../../..'
import { DesignFactoryDesignRequest } from '../../../../../../design/factory'

interface Params {
  designRequest: DesignFactoryDesignRequest
}

const templates = {
  create: ({ designRequest }: Params): Template => {
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
        body: '',
      },
    }
  },
}

export default templates
