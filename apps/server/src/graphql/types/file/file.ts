import { enumType, interfaceType, objectType } from 'nexus'

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

export const FileType = enumType({
  name: 'FileType',
  members: ['IMAGE', 'VIDEO', 'PDF', 'UNKNOWN'],
})

export const File = interfaceType({
  name: 'File',
  resolveType(file) {
    switch (file.fileType) {
      case 'IMAGE':
        return 'FileImage'
      case 'PDF':
        return 'FilePdf'
      default:
        return 'FileUnknown'
    }
  },
  definition(t) {
    t.nonNull.id('id')
    t.nullable.string('membershipId')
    t.nullable.string('organizationId')

    t.nonNull.field('fileType', { type: 'FileType' })

    t.nonNull.string('url')
    t.nonNull.string('name')
    t.nonNull.int('bytes')
    t.nonNull.string('format')

    t.nonNull.DateTime('createdAt')
    t.nullable.DateTime('updatedAt')

    t.nonNull.field('humanizedBytes', {
      type: 'String',
      resolve: file => formatBytes(file.bytes),
    })
  },
})

export const FileUnknown = objectType({
  name: 'FileUnknown',
  definition(t) {
    t.implements('File')
  },
})

export const FileImage = objectType({
  name: 'FileImage',
  definition(t) {
    t.implements('File')
    t.nonNull.int('width')
    t.nonNull.int('height')
  },
})

export const FilePdf = objectType({
  name: 'FilePdf',
  definition(t) {
    t.implements('File')
  },
})
