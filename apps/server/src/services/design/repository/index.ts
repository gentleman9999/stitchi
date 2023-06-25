import makeCreateDesignRequest from './create-design-request'
import makeUpdateDesignRequest from './update-design-request'
import makeGetDesignRequest from './get-design-request'
import makeListDesignRequests from './list-design-requests'

import makeCreateDesignProof from './create-design-proof'
import makeGetDesignProof from './get-design-proof'
import makeListDesignProofs from './list-design-proofs'

export interface DesignRepositoryInit {}

export interface DesignRepository {
  createDesignRequest: ReturnType<typeof makeCreateDesignRequest>
  updateDesignRequest: ReturnType<typeof makeUpdateDesignRequest>
  getDesignRequest: ReturnType<typeof makeGetDesignRequest>
  listDesignRequests: ReturnType<typeof makeListDesignRequests>

  createDesignProof: ReturnType<typeof makeCreateDesignProof>
  getDesignProof: ReturnType<typeof makeGetDesignProof>
  listDesignProofs: ReturnType<typeof makeListDesignProofs>
}

type MakeDesignRepositoryFn = (init?: DesignRepositoryInit) => DesignRepository

const makeDesignRepository: MakeDesignRepositoryFn = init => ({
  createDesignRequest: makeCreateDesignRequest(),
  updateDesignRequest: makeUpdateDesignRequest(),
  getDesignRequest: makeGetDesignRequest(),
  listDesignRequests: makeListDesignRequests(),

  createDesignProof: makeCreateDesignProof(),
  getDesignProof: makeGetDesignProof(),
  listDesignProofs: makeListDesignProofs(),
})

export default makeDesignRepository
