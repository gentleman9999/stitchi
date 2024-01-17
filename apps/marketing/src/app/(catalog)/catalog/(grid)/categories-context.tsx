'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  CategoriesContextGetDataQuery,
  CategoriesContextGetDataQueryVariables,
} from '@generated/types'
import React from 'react'

interface State {
  collections: CategoriesContextGetDataQuery['site']['collections'][0]['children']
  categories: CategoriesContextGetDataQuery['site']['categoryTree']
}

const CategoriesContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

export const CategoriesProvider = ({ children }: Props) => {
  const { data } = useSuspenseQuery<
    CategoriesContextGetDataQuery,
    CategoriesContextGetDataQueryVariables
  >(GET_DATA)

  const { categoryTree, collections } = data.site

  return (
    <CategoriesContext.Provider
      value={{
        collections: collections[0]?.children || [],
        categories: categoryTree,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => {
  const context = React.useContext(CategoriesContext)

  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider')
  }

  return context
}

const GET_DATA = gql`
  query CategoriesContextGetDataQuery {
    site {
      categoryTree {
        entityId
        name
        path
        children {
          entityId
          name
          path
          children {
            entityId
            name
            path

            children {
              entityId
              name
              path
            }
          }
        }
      }

      collections: categoryTree(rootEntityId: 516) {
        entityId
        children {
          entityId
          name
          path
        }
      }
    }
  }
`
