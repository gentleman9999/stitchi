import React from 'react'

const LIMIT = 10

interface Props {
  hexColors: string[]
}

const SwatchGroup = ({ hexColors }: Props) => {
  if (!hexColors.length) return null

  const [visibleColors, hiddenColors] =
    hexColors.length > LIMIT
      ? [hexColors.slice(0, LIMIT), hexColors.slice(LIMIT)]
      : [hexColors, []]

  return (
    <div className="flex items-center">
      {visibleColors?.map((hex, index) => (
        <span
          key={hex}
          className="inline-flex w-5 h-5 rounded-full border-2 border-paper"
          style={{
            backgroundColor: hex,
            transform: `translateX(-${5 * index}px)`,
          }}
        />
      ))}
      {hiddenColors?.length > 0 ? (
        <span
          className="text-xs text-gray-700 font-semibold bg-white py-0.5 px-1 rounded-full"
          style={{
            transform: `translateX(-${5 * visibleColors.length - 1}px)`,
          }}
        >
          +{hiddenColors.length}
        </span>
      ) : null}
    </div>
  )
}

export default SwatchGroup
