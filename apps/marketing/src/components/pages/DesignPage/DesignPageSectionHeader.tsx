import React from 'react'

const DesignPageSectionHeader = ({
  pretitle,
  title,
  subtitle,
}: {
  title: string
  pretitle?: string
  subtitle?: string
}) => {
  return (
    <div className="flex flex-col items-center">
      {pretitle && (
        <span className="uppercase text-sm tracking-tight font-bold text-white bg-primaryAlt-400 rounded-full px-2">
          {pretitle}
        </span>
      )}

      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mt-2">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text sm:text-lg md:text-xl text-gray-600 max-w-2xl text-center">
          Work 1x1 with a designer to create stunning promotional products for
          your merch campaigns. Receive designs in 1-2 days.
        </p>
      )}
    </div>
  )
}

export default DesignPageSectionHeader
