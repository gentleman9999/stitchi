import { gql, useQuery } from '@apollo/client'
import { Card, CardContent, CardFloatingActions } from '@components/ui/Card'
import Tooltip from '@components/ui/Tooltip'
import {
  ClosetBrandIndexPageFilesQuery,
  ClosetBrandIndexPageFilesQueryVariables,
} from '@generated/ClosetBrandIndexPageFilesQuery'
import { TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { notEmpty } from '@utils/typescript'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import BrandFilesForm from './BrandFilesForm'
import useClosetBrandIndexPageFiles from './useClosetBrandIndexPageFiles'

interface Props {}

const ClosetBrandIndexPageFiles = ({}: Props) => {
  const [showBrandFilesForm, setShowBrandFilesForm] = React.useState(false)
  const { handleCreateFiles, handleDeleteFiles } =
    useClosetBrandIndexPageFiles()

  const { data, loading } = useQuery<
    ClosetBrandIndexPageFilesQuery,
    ClosetBrandIndexPageFilesQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 10,
    },
  })

  const { organization } = data?.viewer || {}

  const { brand } = organization || {}

  const files = React.useMemo(
    () => brand?.files.edges?.map(edge => edge?.node).filter(notEmpty) || [],
    [brand?.files.edges],
  )

  React.useEffect(() => {
    if (!loading && !files.length && !showBrandFilesForm) {
      setShowBrandFilesForm(true)
    }
  }, [files.length, loading, showBrandFilesForm])

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-x-scroll">
        {files.map(file => (
          <Card key={file.id}>
            <CardFloatingActions
              items={[
                {
                  label: 'Delete',
                  onClick: () => handleDeleteFiles({ fileIds: [file.id] }),
                  icon: <TrashIcon className="w-full" />,
                },
              ]}
            />
            {file.__typename === 'FileImage' ? (
              <img
                key={file.id}
                src={file.url}
                className="w-full aspect-square object-contain"
                width={file.width}
                height={file.height}
              />
            ) : file.__typename === 'FilePdf' ? (
              <embed
                key={file.id}
                src={file.url}
                className="w-full aspect-square"
                type="application/pdf"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-50 flex items-center justify-center">
                <span className="text-sm text-gray-400">
                  Preview unavailable
                </span>
              </div>
            )}

            <CardContent>
              <div className="flex flex-col gap-1">
                <Tooltip
                  label={file.name}
                  renderTrigger={() => (
                    <h2 className="font-medium truncate">{file.name}</h2>
                  )}
                />
                <span className="text-gray-400 text-sm">
                  {file.format} ·{' '}
                  {formatDistanceToNow(new Date(file.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        {!showBrandFilesForm && files.length < 10 ? (
          <div>
            <button
              className="w-full aspect-square bg-gray-50 flex items-center justify-center"
              onClick={() => setShowBrandFilesForm(true)}
            >
              <span className="text-sm text-gray-400">Add file</span>
            </button>
          </div>
        ) : null}
      </div>

      {brand && showBrandFilesForm ? (
        <div className="relative">
          {files.length > 0 ? (
            <div className="absolute -top-1 -right-2 z-10">
              <button
                className="p-1 rounded-md bg-gray-900/30 hover:bg-gray-900/25"
                onClick={() => setShowBrandFilesForm(false)}
              >
                <XMarkIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : null}
          <div className="z-0 relative">
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
          </div>
        </div>
      ) : null}
    </div>
  )
}

const GET_DATA = gql`
  query ClosetBrandIndexPageFilesQuery($first: Int!, $after: String) {
    viewer {
      id
      organization {
        id

        brand {
          id
          fileUploadDirectory
          files(after: $after, first: $first) {
            edges {
              node {
                id
                createdAt
                url
                name
                format

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
