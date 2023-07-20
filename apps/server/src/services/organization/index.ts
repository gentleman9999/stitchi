import makeOrganizationRepository, {
  OrganizationRepository,
} from './repository'
import {
  makeCreateOrganizationColor,
  CreateOrganizationColor,
} from './methods/create-organization-color'

import {
  makeUpdateOrganizationColor,
  UpdateOrganizationColor,
} from './methods/update-organization-color'

import {
  makeDeleteOrganizationColor,
  DeleteOrganizationColor,
} from './methods/delete-organization-color'

import {
  makeListOrganizationColors,
  ListOrganizationColors,
} from './methods/list-organization-colors'

export interface OrganizationService {
  createOrganization: OrganizationRepository['createOrganization']
  getOrganization: OrganizationRepository['getOrganization']
  listOrganizations: OrganizationRepository['listOrganizations']

  createOrganizationFile: OrganizationRepository['createOrganizationFile']
  getOrganizationFile: OrganizationRepository['getOrganizationFile']
  listOrganizationFiles: OrganizationRepository['listOrganizationFiles']
  deleteOrganizationFile: OrganizationRepository['deleteOrganizationFile']

  createOrganizationColor: CreateOrganizationColor
  updateOrganizationColor: UpdateOrganizationColor
  deleteOrganizationColor: DeleteOrganizationColor
  listOrganizationColors: ListOrganizationColors
}

interface MakeClientParams {
  organizationRepository: OrganizationRepository
}

type MakeClientFn = (params?: MakeClientParams) => OrganizationService

const makeClient: MakeClientFn = (
  { organizationRepository } = {
    organizationRepository: makeOrganizationRepository(),
  },
) => {
  return {
    createOrganizationColor: makeCreateOrganizationColor(),
    updateOrganizationColor: makeUpdateOrganizationColor(),
    deleteOrganizationColor: makeDeleteOrganizationColor(),
    listOrganizationColors: makeListOrganizationColors(),

    createOrganization: async input => {
      let organization

      try {
        organization = await organizationRepository.createOrganization(input)
      } catch (error) {
        console.error(
          `Error creating organization: ${input.organization.name}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return organization
    },
    getOrganization: async input => {
      let organization

      try {
        organization = await organizationRepository.getOrganization(input)
      } catch (error) {
        console.error(`Error getting organization: ${input.organizationId}`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      return organization
    },

    listOrganizations: async input => {
      let organizations

      try {
        organizations = await organizationRepository.listOrganizations(input)
      } catch (error) {
        console.error(`Error listing organizations`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      return organizations
    },

    createOrganizationFile: async input => {
      let organizationFile

      try {
        organizationFile = await organizationRepository.createOrganizationFile(
          input,
        )
      } catch (error) {
        console.error(
          `Error creating organization file: ${input.organizationFile.fileId}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return organizationFile
    },

    getOrganizationFile: async input => {
      let organizationFile

      try {
        organizationFile = await organizationRepository.getOrganizationFile(
          input,
        )
      } catch (error) {
        console.error(
          `Error getting organization file: ${input.organizationFileId}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return organizationFile
    },

    listOrganizationFiles: async input => {
      let organizationFiles

      try {
        organizationFiles = await organizationRepository.listOrganizationFiles(
          input,
        )
      } catch (error) {
        console.error(`Error listing organization files`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      return organizationFiles
    },

    deleteOrganizationFile: async input => {
      let organizationFile

      try {
        organizationFile = await organizationRepository.deleteOrganizationFile(
          input,
        )
      } catch (error) {
        console.error(
          `Error deleting organization file: ${input.organizationFileId}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return organizationFile
    },
  }
}

export { makeClient }
