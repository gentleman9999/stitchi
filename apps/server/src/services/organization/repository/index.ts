import { makeCreateOrganization } from './create-organization'
import { makeGetOrganization } from './get-organization'
import { makeListOrganizations } from './list-organizations'

import { makeCreateOrganizationFile } from './create-organization-file'
import { makeGetOrganizationFile } from './get-organization-file'
import { makeListOrganizationFiles } from './list-organization-files'
import { makeDeleteOrganizationFile } from './delete-organization-file'

import { makeCreateOrganizationColor } from './create-organization-color'
import { makeGetOrganizationColor } from './get-organization-color'
import { makeListOrganizationColors } from './list-organization-colors'
import { makeDeleteOrganizationColor } from './delete-organization-color'

export interface OrganizationRepositoryInit {}

export interface OrganizationRepository {
  createOrganization: ReturnType<typeof makeCreateOrganization>
  getOrganization: ReturnType<typeof makeGetOrganization>
  listOrganizations: ReturnType<typeof makeListOrganizations>

  createOrganizationFile: ReturnType<typeof makeCreateOrganizationFile>
  getOrganizationFile: ReturnType<typeof makeGetOrganizationFile>
  listOrganizationFiles: ReturnType<typeof makeListOrganizationFiles>
  deleteOrganizationFile: ReturnType<typeof makeDeleteOrganizationFile>

  createOrganizationColor: ReturnType<typeof makeCreateOrganizationColor>
  getOrganizationColor: ReturnType<typeof makeGetOrganizationColor>
  listOrganizationColors: ReturnType<typeof makeListOrganizationColors>
  deleteOrganizationColor: ReturnType<typeof makeDeleteOrganizationColor>
}

type MakeOrganizationRepositoryFn = (
  init?: OrganizationRepositoryInit,
) => OrganizationRepository

const makeOrganizationRepository: MakeOrganizationRepositoryFn = init => ({
  createOrganization: makeCreateOrganization(),
  getOrganization: makeGetOrganization(),
  listOrganizations: makeListOrganizations(),

  createOrganizationFile: makeCreateOrganizationFile(),
  getOrganizationFile: makeGetOrganizationFile(),
  listOrganizationFiles: makeListOrganizationFiles(),
  deleteOrganizationFile: makeDeleteOrganizationFile(),

  createOrganizationColor: makeCreateOrganizationColor(),
  getOrganizationColor: makeGetOrganizationColor(),
  listOrganizationColors: makeListOrganizationColors(),
  deleteOrganizationColor: makeDeleteOrganizationColor(),
})

export default makeOrganizationRepository
