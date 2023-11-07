import { gql, useMutation } from '@apollo/client'
import { FileType } from '@generated/globalTypes'
import {
  UseFileUploadCreateFileMutation,
  UseFileUploadCreateFileMutationVariables,
} from '@generated/types'
import { useState } from 'react'
import * as yup from 'yup'

const cloundinaryFileSchema = yup
  .object()
  .shape({
    asset_id: yup.string().required(),
    url: yup.string().required(),
    original_filename: yup.string().required(),
    bytes: yup.number().required(),
    resource_type: yup.string().required(),

    format: yup.string().nullable().notRequired(),
    public_id: yup.string().nullable().notRequired(),
    version: yup.number().nullable().notRequired(),
    version_id: yup.string().nullable().notRequired(),
    signature: yup.string().nullable().notRequired(),
    width: yup.number().nullable().notRequired(),
    height: yup.number().nullable().notRequired(),
    created_at: yup.string().nullable().notRequired(),
    tags: yup.array(yup.string()).nullable().notRequired(),
    pages: yup.number().nullable().notRequired(),
    type: yup.string().nullable().notRequired(),
    etag: yup.string().nullable().notRequired(),
    placeholder: yup.boolean().nullable().notRequired(),
    secure_url: yup.string().nullable().notRequired(),
    access_mode: yup.string().nullable().notRequired(),
  })
  .label('Cloudinary file')

type CloudinaryFile = yup.InferType<typeof cloundinaryFileSchema>

export interface UploadingFile {
  fileId: string | null
  fileName: string
  pctComplete: number
  filePath: string
  fileType: string | null
  fileBytes: number | null
}

const useFiledUpload = () => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])

  const [createFiles] = useMutation<
    UseFileUploadCreateFileMutation,
    UseFileUploadCreateFileMutationVariables
  >(CREATE_FILES)

  const handleUpload = async (
    // Local path, remote HTTP or HTTPS URL, whitelisted storage bucket (S3 or Google Storage) URL,
    // base64 data URI, FTP URL
    files: (File | string)[],
    options: {
      folder: string
    },
  ) => {
    setUploadingFiles(prev => [
      ...prev,
      ...files.map(file => ({
        fileId: null,
        pctComplete: 0,
        filePath: file instanceof File ? URL.createObjectURL(file) : file,
        fileName: file instanceof File ? file.name : file,
        fileType: file instanceof File ? file.type : null,
        fileBytes: file instanceof File ? file.size : null,
      })),
    ])

    let fileData: CloudinaryFile[] = []

    let signature, timestamp, cloudName, apiKey

    const fileUploadPromises = files.map(async file => {
      // Fetch signed data from the custom API route
      try {
        const response = await fetch('/api/cloudinary/sign-request', {
          method: 'POST',
          body: JSON.stringify({ folder: options.folder }),
        })

        const data = await response.json()

        signature = data.signature
        cloudName = data.cloudName
        apiKey = data.apiKey
        timestamp = data.timestamp.toString()
      } catch (error) {
        console.error(`Failed to generate signed URL`, {
          context: { error, file },
        })

        return null
      }

      const uploadingFile: Omit<UploadingFile, 'pctComplete' | 'fileId'> = {
        fileName: file instanceof File ? file.name : file,
        filePath: file instanceof File ? URL.createObjectURL(file) : file,
        fileType: file instanceof File ? file.type : null,
        fileBytes: file instanceof File ? file.size : null,
      }

      const handleProgress = (pctComplete: number) => {
        setUploadingFiles(prev => {
          const fileIndex = prev.findIndex(
            f => f.fileName === uploadingFile.fileName,
          )

          if (fileIndex === -1) {
            return prev
          }

          return [
            ...prev.slice(0, fileIndex),
            { ...uploadingFile, pctComplete, fileId: null },
            ...prev.slice(fileIndex + 1),
          ]
        })
      }

      const cloudinaryFile = await uploadFile(file, handleProgress, {
        apiKey,
        cloudName,
        signature,
        timestamp,
        folder: options.folder,
      })

      fileData.push(cloudinaryFile)
    })

    await Promise.all(fileUploadPromises)

    const { data } = await createFiles({
      variables: {
        input: {
          files: fileData.map(file => ({
            fileType: getFileType(file),
            name: file.original_filename,
            originalFilename: file.original_filename,
            url: file.url,
            cloudinaryAssetId: file.asset_id,
            width: file.width,
            height: file.height,
            bytes: file.bytes,
            format: file.format || '',
          })),
        },
      },
    })

    const cloudinaryFiles = data?.fileCreateBatch?.files

    setUploadingFiles(prev => {
      return prev.map(file => {
        const cloudinaryFile = cloudinaryFiles?.find(
          f => f.name === file.fileName.split('.')[0],
        )

        if (!cloudinaryFile) {
          return file
        }

        return {
          ...file,
          fileId: cloudinaryFile.id,
        }
      })
    })

    return cloudinaryFiles
  }

  return { handleUpload, uploadingFiles }
}

const getFileType = (file: CloudinaryFile): FileType => {
  switch (file.resource_type) {
    case 'image':
      if (file.format && ['pdf'].includes(file.format)) {
        return FileType.PDF
      }

      if (isImageFile(file.format)) {
        return FileType.IMAGE
      }
    case 'video':
      return FileType.VIDEO
    default:
      return FileType.UNKNOWN
  }
}

function isImageFile(extension?: string | null) {
  // Define the list of image file extensions
  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'svg',
    'webp',
    'ico',
    'avif',
  ]

  // Extract the file extension from the file name
  const fileExtension = extension?.toLowerCase()

  if (!fileExtension) {
    return false
  }

  // Check if the file extension is in the list of image extensions
  return imageExtensions.includes(fileExtension)
}

const uploadFile = (
  file: string | File,
  onProgress: (pctComplete: number) => void,
  params: {
    cloudName: string
    signature: string
    timestamp: string
    apiKey: string
    folder: string
  },
) => {
  return new Promise<CloudinaryFile>((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${params.cloudName}/upload`
    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    xhr.open('POST', url, true)

    // Update progress
    xhr.upload.addEventListener(
      'progress',
      function (evt) {
        if (evt.lengthComputable) {
          const percentComplete = evt.loaded / evt.total
          onProgress(percentComplete)
        }
      },
      false,
    )

    // Load completed
    xhr.addEventListener('load', async function () {
      const response = JSON.parse(xhr.response)

      const data = await cloundinaryFileSchema.validate(response)
      resolve(data)
    })

    // Error occurred
    xhr.addEventListener('error', function () {
      reject(new Error('Upload failed'))
    })

    formData.append('file', file)
    formData.append('signature', params.signature)
    formData.append('timestamp', params.timestamp)
    formData.append('api_key', params.apiKey)
    formData.append('folder', params.folder)

    // Finally, send our form data
    xhr.send(formData)
  })
}

const CREATE_FILES = gql`
  mutation UseFileUploadCreateFileMutation($input: FileCreateBatchInput!) {
    fileCreateBatch(input: $input) {
      files {
        id
        name
      }
    }
  }
`

export default useFiledUpload
