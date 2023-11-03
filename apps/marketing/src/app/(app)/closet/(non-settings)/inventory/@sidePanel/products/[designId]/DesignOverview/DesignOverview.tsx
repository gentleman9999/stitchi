'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import React from 'react'
import {
  DesignOverviewGetDataQuery,
  DesignOverviewGetDataQueryVariables,
} from '@generated/DesignOverviewGetDataQuery'
import { ComponentErrorMessage } from '@components/common'

import DesignInventoryMatrix from './DesignInventoryMatrix'
import {
  Card,
  CardCollapsableContent,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/ui/Card'
import { useProductContext } from '../product-context'

interface Props {
  designId: string
}

const DesignOverview = ({ designId }: Props) => {
  const { activeColorId, setActiveColorId } = useProductContext()

  const { data, error } = useSuspenseQuery<
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

      {design ? (
        <div>
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
        </div>
      ) : null}
    </>
  )
}

const GET_DATA = gql`
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

      ...DesignInventoryMatrixDesignProductFragment
    }
  }
`

export default DesignOverview
