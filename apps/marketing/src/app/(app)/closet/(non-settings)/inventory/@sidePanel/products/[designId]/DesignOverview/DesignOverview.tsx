'use client'

import { gql, useQuery } from '@apollo/client'
import React from 'react'
import ClosetSection from '@components/common/ClosetSection'
import {
  DesignOverviewGetDataQuery,
  DesignOverviewGetDataQueryVariables,
} from '@generated/DesignOverviewGetDataQuery'
import DesignPreviewGallery from './DesignPreviewGallery'
import useDesignOverview from './useDesignOverview'
import { ComponentErrorMessage } from '@components/common'

import DesignInventoryMatrix from './DesignInventoryMatrix'
import {
  Card,
  CardCollapsableContent,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/ui/Card'

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

  return (
    <>
      <ComponentErrorMessage error={error} />

      <ClosetSection>
        <div className="max-h-[220px] flex">
          <DesignPreviewGallery
            design={design}
            activeColorId={activeColorId}
            loading={loading}
          />
        </div>
      </ClosetSection>

      {design ? (
        <ClosetSection>
          <Card collapsable>
            <CardHeader>
              <CardTitle title="Inventory" />
            </CardHeader>
            <CardCollapsableContent>
              <CardContent divide>
                <DesignInventoryMatrix
                  designProduct={design}
                  onColorClick={colorId => setActiveColorId(colorId)}
                />
              </CardContent>
            </CardCollapsableContent>
          </Card>
        </ClosetSection>
      ) : null}
    </>
  )
}

const GET_DATA = gql`
  ${DesignPreviewGallery.fragments.designProduct}
  ${DesignInventoryMatrix.fragments.designProduct}
  query DesignOverviewGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      description
      designRequestId
      colors {
        id
        hex
        name
      }

      ...DesignPreviewGalleryDesignProductFragment
      ...DesignInventoryMatrixDesignProductFragment
    }
  }
`

export default DesignOverview
