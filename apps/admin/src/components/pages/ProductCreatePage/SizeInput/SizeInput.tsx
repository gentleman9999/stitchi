import React from 'react'
import SizeSelector from './SizeSelector'

interface SizeInputProps {
  index: number
}

const SizeInput = ({ index }: SizeInputProps) => {
  return (
    <>
      <SizeSelector index={index} onCreateSize={() => {}} />
    </>
  )
}

export default SizeInput
