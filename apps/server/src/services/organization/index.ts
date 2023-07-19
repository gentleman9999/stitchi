import makeOrganizationRepository, {
  OrganizationRepository,
} from './repository'

export interface OrganizationService {
  createOrganization: OrganizationRepository['createOrganization']
  getOrganization: OrganizationRepository['getOrganization']
  listOrganizations: OrganizationRepository['listOrganizations']

  createOrganizationFile: OrganizationRepository['createOrganizationFile']
  getOrganizationFile: OrganizationRepository['getOrganizationFile']
  listOrganizationFiles: OrganizationRepository['listOrganizationFiles']
  deleteOrganizationFile: OrganizationRepository['deleteOrganizationFile']

  createOrganizationColor: OrganizationRepository['createOrganizationColor']
  getOrganizationColor: OrganizationRepository['getOrganizationColor']
  listOrganizationColors: OrganizationRepository['listOrganizationColors']
  deleteOrganizationColor: OrganizationRepository['deleteOrganizationColor']
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

    createOrganizationColor: async input => {
      let organizationColor

      try {
        organizationColor =
          await organizationRepository.createOrganizationColor(input)
      } catch (error) {
        console.error(
          `Error creating organization color: ${input.organizationColor.colorId}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return organizationColor
    },

    getOrganizationColor: async input => {
      let organizationColor

      try {
        organizationColor = await organizationRepository.getOrganizationColor(
          input,
        )
      } catch (error) {
        console.error(
          `Error getting organization color: ${input.organizationColorId}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return organizationColor
    },

    listOrganizationColors: async input => {
      let organizationColors

      try {
        organizationColors =
          await organizationRepository.listOrganizationColors(input)
      } catch (error) {
        console.error(`Error listing organization colors`, {
          context: {
            error,
            input,
          },
        })
        throw error
      }

      return organizationColors
    },

    deleteOrganizationColor: async input => {
      let organizationColor

      try {
        organizationColor =
          await organizationRepository.deleteOrganizationColor(input)
      } catch (error) {
        console.error(
          `Error deleting organization color: ${input.organizationColorId}`,
          {
            context: {
              error,
              input,
            },
          },
        )
        throw error
      }

      return organizationColor
    },
  }
}

export { makeClient }
