import React from 'react'
import { useFormContext } from 'react-hook-form'
import ColorCreator from './ColorCreator'
import ColorSelector from './ColorSelector'

interface Props {
  index: number
}

const ColorInput = ({ index }: Props) => {
  const { setValue } = useFormContext()
  const [createColor, setCreateColor] = React.useState(false)

  const handleCreateColor = (colorId: string) => {
    setCreateColor(false)
    setValue(`variants.${index}.colorId`, colorId)
  }

  return (
    <>
      {createColor ? (
        <ColorCreator
          onClose={() => setCreateColor(false)}
          onSubmit={handleCreateColor}
        />
      ) : null}
      <ColorSelector index={index} onCreateColor={() => setCreateColor(true)} />
    </>
  )
}

export default ColorInput
