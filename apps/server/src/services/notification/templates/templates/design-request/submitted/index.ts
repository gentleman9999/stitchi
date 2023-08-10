import adminTemplates from './admin'
import userTemplates from './user'

export type { Params as DesignRequestSubmittedAdminParams } from './admin'
export type { Params as DesignRequestSubmittedUserParams } from './user'

const templates = {
  admin: adminTemplates,
  user: userTemplates,
}

export default templates
