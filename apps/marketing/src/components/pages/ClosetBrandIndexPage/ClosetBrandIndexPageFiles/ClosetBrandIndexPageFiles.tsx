import { gql, useQuery } from '@apollo/client'
import { ClosetBrandIndexPageFilesQuery } from '@generated/ClosetBrandIndexPageFilesQuery'
import { notEmpty } from '@utils/typescript'
import React from 'react'
import BrandFilesForm from './BrandFilesForm'
import useClosetBrandIndexPageFiles from './useClosetBrandIndexPageFiles'

interface Props {}

const ClosetBrandIndexPageFiles = ({}: Props) => {
  const [showBrandFilesForm, setShowBrandFilesForm] = React.useState(false)
  const { handleCreateFiles, handleDeleteFiles } =
    useClosetBrandIndexPageFiles()

  const { data } = useQuery<ClosetBrandIndexPageFilesQuery>(GET_DATA)

  const { organization } = data?.viewer || {}

  const { brand } = organization || {}

  const files = React.useMemo(
    () => brand?.files.edges?.map(edge => edge?.node).filter(notEmpty) || [],
    [brand?.files.edges],
  )

  React.useEffect(() => {
    if (!files.length && !showBrandFilesForm) {
      setShowBrandFilesForm(true)
    }
  }, [files.length, showBrandFilesForm])

  return (
    <div className="flex flex-col gap-4">
      {brand ? (
        <BrandFilesForm
          folder={brand.fileUploadDirectory}
          onChange={values => {
            if (organization?.id) {
              handleCreateFiles({
                organizationId: organization.id,
                files: values.fileIds.map(fileId => ({ fileId })),
              })
            }
          }}
        />
      ) : null}

      <div className="flex flex-row gap-4 overflow-x-scroll">
        {files.map(file =>
          file.__typename === 'FileImage' ? (
            <img
              key={file.id}
              src={file.url}
              className="w-64 h-64 object-contain"
              width={file.width}
              height={file.height}
            />
          ) : file.__typename === 'FilePdf' ? (
            <embed
              key={file.id}
              src={file.url}
              className="w-64 h-64"
              type="application/pdf"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-50 flex items-center justify-center">
              <span className="text-sm text-gray-400">Preview unavailable</span>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

const GET_DATA = gql`
  query ClosetBrandIndexPageFilesQuery {
    viewer {
      id
      organization {
        id

        brand {
          id
          fileUploadDirectory
          files {
            edges {
              node {
                id
                url

                ... on FileImage {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ClosetBrandIndexPageFiles
