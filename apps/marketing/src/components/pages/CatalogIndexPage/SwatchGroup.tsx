import React from 'react'

interface Props {
  hexColors: string[]
}

const SwatchGroup = ({ hexColors }: Props) => {
  if (!hexColors.length) return null
  return (
    <div className="flex">
      {hexColors?.map((hex, index) => (
        <span
          key={hex}
          className="inline-flex w-5 h-5 rounded-full border-2 border-paper"
          style={{
            backgroundColor: `#${hex}`,
            transform: `translateX(-${5 * index}px)`,
          }}
        />
      ))}
    </div>
  )
}

export default SwatchGroup
