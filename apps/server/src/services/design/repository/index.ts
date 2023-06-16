import makeCreateDesignRequest from './create-design-request'
import makeUpdateDesignRequest from './update-design-request'
import makeGetDesignRequest from './get-design-request'
import makeListDesignRequests from './list-design-requests'

export interface DesignRepositoryInit {}

export interface DesignRepository {
  createDesignRequest: ReturnType<typeof makeCreateDesignRequest>
  updateDesignRequest: ReturnType<typeof makeUpdateDesignRequest>
  getDesignRequest: ReturnType<typeof makeGetDesignRequest>
  listDesignRequests: ReturnType<typeof makeListDesignRequests>
}

type MakeDesignRepositoryFn = (init?: DesignRepositoryInit) => DesignRepository

const makeDesignRepository: MakeDesignRepositoryFn = init => ({
  createDesignRequest: makeCreateDesignRequest(),
  updateDesignRequest: makeUpdateDesignRequest(),
  getDesignRequest: makeGetDesignRequest(),
  listDesignRequests: makeListDesignRequests(),
})

export default makeDesignRepository
