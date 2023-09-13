import makeCreateDesign from './create-design'
import makeGetDesign from './get-design'
import makeListDesigns from './list-designs'
import { makeListDesignsCount } from './list-designs-count'

import makeCreateDesignRequest from './create-design-request'
import makeUpdateDesignRequest from './update-design-request'
import makeGetDesignRequest from './get-design-request'
import makeListDesignRequests from './list-design-requests'
import { makeListDesignRequestsCount } from './list-design-requests-count'

import makeCreateDesignProof from './create-design-proof'
import makeGetDesignProof from './get-design-proof'
import makeListDesignProofs from './list-design-proofs'

export interface DesignRepositoryInit {}

export interface DesignRepository {
  createDesign: ReturnType<typeof makeCreateDesign>
  getDesign: ReturnType<typeof makeGetDesign>
  listDesigns: ReturnType<typeof makeListDesigns>
  listDesignsCount: ReturnType<typeof makeListDesignsCount>

  createDesignRequest: ReturnType<typeof makeCreateDesignRequest>
  updateDesignRequest: ReturnType<typeof makeUpdateDesignRequest>
  getDesignRequest: ReturnType<typeof makeGetDesignRequest>
  listDesignRequests: ReturnType<typeof makeListDesignRequests>
  listDesignRequestsCount: ReturnType<typeof makeListDesignRequestsCount>

  createDesignProof: ReturnType<typeof makeCreateDesignProof>
  getDesignProof: ReturnType<typeof makeGetDesignProof>
  listDesignProofs: ReturnType<typeof makeListDesignProofs>
}

type MakeDesignRepositoryFn = (init?: DesignRepositoryInit) => DesignRepository

const makeDesignRepository: MakeDesignRepositoryFn = init => ({
  createDesign: makeCreateDesign(),
  getDesign: makeGetDesign(),
  listDesigns: makeListDesigns(),
  listDesignsCount: makeListDesignsCount(),

  createDesignRequest: makeCreateDesignRequest(),
  updateDesignRequest: makeUpdateDesignRequest(),
  getDesignRequest: makeGetDesignRequest(),
  listDesignRequests: makeListDesignRequests(),
  listDesignRequestsCount: makeListDesignRequestsCount(),

  createDesignProof: makeCreateDesignProof(),
  getDesignProof: makeGetDesignProof(),
  listDesignProofs: makeListDesignProofs(),
})

export default makeDesignRepository
