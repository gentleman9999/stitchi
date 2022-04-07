import React from 'react'
import { gql } from '@apollo/client'

const colors = [
  { id: 123, hex: '#FF0000', name: 'Red' },
  { id: 456, hex: '#00FF00', name: 'Green' },
  { id: 789, hex: '#0000FF', name: 'Blue' },
]

const useColors = () => {
  return { colors }
}

const GET_DATA = gql`
  query UseColorsGetDataQuery {
    catalog {
      id
    }
  }
`

export default useColors
