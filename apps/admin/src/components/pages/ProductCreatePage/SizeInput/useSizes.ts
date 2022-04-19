import React from 'react'
import { gql } from '@apollo/client'

const sizes = [
  {
    id: 123,
    name: 'Small',
    value: 'S',
  },
  {
    id: 456,
    name: 'Medium',
    value: 'M',
  },
  {
    id: 789,
    name: 'Large',
    value: 'L',
  },
]

const useSizes = () => {
  return { sizes }
}

export default useSizes
