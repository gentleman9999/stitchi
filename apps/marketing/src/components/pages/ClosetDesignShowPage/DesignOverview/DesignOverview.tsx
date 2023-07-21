import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import { InputGroup } from '@components/ui'
import ClosetSection from '@components/common/ClosetSection'
import {
  DesignOverviewGetDataQuery,
  DesignOverviewGetDataQueryVariables,
} from '@generated/DesignOverviewGetDataQuery'
import DesignPreviewGallery from './DesignPreviewGallery'
import useDesignOverview from './useDesignOverview'
import { ComponentErrorMessage } from '@components/common'
import ColorSwatch from '@components/common/ColorSwatch'
import FormSection from '@components/pages/ClosetDesignBuyPage/FormSection'

interface Props {
  designId: string
}

const DesignOverview = ({ designId }: Props) => {
  const { activeColorId, setActiveColorId } = useDesignOverview()

  const { data, loading, error } = useQuery<
    DesignOverviewGetDataQuery,
    DesignOverviewGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId },
  })

  const design = data?.designProduct

  React.useEffect(() => {
    if (!activeColorId && design) {
      setActiveColorId(design.colors[0]?.id || null)
    }
  }, [activeColorId, design, setActiveColorId])

  console.log('DESIGN COLORS', design?.colors)

  return (
    <>
      <ComponentErrorMessage error={error} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="col-span-1 md:col-span-8">
          <DesignPreviewGallery
            design={design}
            activeColorId={activeColorId}
            loading={loading}
          />
        </div>

        <div className="col-span-1 md:col-span-4">
          <ClosetSection>
            <Card>
              <CardHeader>
                <CardTitle title="Available options" />
              </CardHeader>
              <CardContent>
                <FormSection>
                  <InputGroup label="Colors">
                    <ul className="flex items-center mt-4 gap-1">
                      {design?.colors?.map(color => (
                        <ColorSwatch
                          key={color.id}
                          hexCode={color.hex || '#FFF'}
                          label={color.name || ''}
                          selected={activeColorId === color.id}
                          onClick={() => setActiveColorId(color.id)}
                        />
                      ))}
                    </ul>
                  </InputGroup>
                  <InputGroup label="Sizes">
                    <p>Need to create some size thinggy here</p>
                  </InputGroup>
                </FormSection>
              </CardContent>
            </Card>
          </ClosetSection>

          <ClosetSection>
            <Card>
              <CardHeader>
                <CardTitle title="Overview" />
              </CardHeader>
              <CardContent>
                <FormSection>
                  <InputGroup label="Description">
                    <p>{design?.description || '-'}</p>
                  </InputGroup>

                  <InputGroup label="Design request">
                    <p>link to design request</p>
                  </InputGroup>
                </FormSection>
              </CardContent>
            </Card>
          </ClosetSection>
        </div>
      </div>

      <ClosetSection>
        <Card>
          <CardHeader>
            <CardTitle title="Inventory" />
          </CardHeader>
          <CardContent divide>
            Need to create some inventory thinggy here
          </CardContent>
        </Card>
      </ClosetSection>
    </>
  )
}

const GET_DATA = gql`
  ${DesignPreviewGallery.fragments.designProduct}
  query DesignOverviewGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      description
      colors {
        id
        hex
        name
      }
      ...DesignPreviewGalleryDesignProductFragment
    }
  }
`

export default DesignOverview
