import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { ClosetBrandIndexPageColorsGetDataQuery } from '@generated/ClosetBrandIndexPageColorsGetDataQuery'
import BrandColorForm, { FormValues } from './BrandColorForm'
import useClosetBrandIndexPageColors from './useClosetBrandIndexPageColors'
import ClosetBrandIndexPageColorsColorPreview from './ClosetBrandIndexPageColorsColorPreview'

interface Props {}

const ClosetBrandIndexPageColors = (props: Props) => {
  const [showColorForm, setShowColorForm] = React.useState<boolean | string>(
    false,
  )
  const { data } = useQuery<ClosetBrandIndexPageColorsGetDataQuery>(GET_DATA)

  const { handleCreateColor, handleDeleteColor, handleUpdateColor } =
    useClosetBrandIndexPageColors()

  const handleSubmit = async (values: FormValues) => {
    if (values.id) {
      await handleUpdateColor({
        id: values.id,
        organizationId: values.organizationId,
        name: values.name,
        hex: values.hex,
        cmykC: values.cmyk_c,
        cmykK: values.cmyk_k,
        cmykM: values.cmyk_m,
        cmykY: values.cmyk_y,
        pantone: values.pantone,
      })
    } else {
      await handleCreateColor({
        organizationId: values.organizationId,
        name: values.name,
        hex: values.hex,
        cmykC: values.cmyk_c,
        cmykK: values.cmyk_k,
        cmykM: values.cmyk_m,
        cmykY: values.cmyk_y,
        pantone: values.pantone,
      })
    }

    setShowColorForm(false)
  }

  const { organization } = data?.viewer || {}

  const colors = organization?.brand?.colors || []

  return (
    <div>
      <ul className="flex gap-4">
        {colors.map((color, idx) => {
          return (
            <li key={idx}>
              {showColorForm === color.id && organization ? (
                <BrandColorForm
                  onClose={() => setShowColorForm(false)}
                  onSubmit={handleSubmit}
                  initialValues={{
                    id: color.id,
                    organizationId: organization.id,
                    name: color.name,
                    hex: color.hex || undefined,
                    cmyk_c: color.cmykC ?? undefined,
                    cmyk_k: color.cmykK ?? undefined,
                    cmyk_m: color.cmykM ?? undefined,
                    cmyk_y: color.cmykY ?? undefined,
                  }}
                />
              ) : (
                <ClosetBrandIndexPageColorsColorPreview
                  color={color}
                  onEdit={() => setShowColorForm(color.id)}
                  onDelete={() => {
                    if (!organization) {
                      console.error(
                        "Organization not present. This shouldn't happen",
                      )
                      return
                    }

                    handleDeleteColor({
                      colorId: color.id,
                      organizationId: organization.id,
                    })
                  }}
                />
              )}
            </li>
          )
        })}

        {!showColorForm && colors.length < 10 ? (
          <li className="flex flex-col items-center w-36 h-36">
            <button
              className="flex flex-col items-center justify-center w-full h-full rounded-md border-2 border-dashed"
              onClick={() => setShowColorForm(true)}
            >
              <span className="text-sm">Add Color</span>
            </button>
          </li>
        ) : null}

        <li>
          {showColorForm === true && organization ? (
            <BrandColorForm
              onClose={() => setShowColorForm(false)}
              onSubmit={handleSubmit}
              initialValues={{
                organizationId: organization.id,
                name: `Color ${colors.length + 1}`,
              }}
            />
          ) : null}
        </li>
      </ul>
    </div>
  )
}

const GET_DATA = gql`
  ${ClosetBrandIndexPageColorsColorPreview.fragments.color}
  query ClosetBrandIndexPageColorsGetDataQuery {
    viewer {
      id
      organization {
        id
        brand {
          id
          colors {
            id
            name
            hex
            cmykC
            cmykM
            cmykY
            cmykK
            ...ClosetBrandIndexPageColorsColorPreviewColorFragment
          }
        }
      }
    }
  }
`

export default ClosetBrandIndexPageColors
