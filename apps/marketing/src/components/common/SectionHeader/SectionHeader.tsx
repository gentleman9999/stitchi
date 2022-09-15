import React from 'react'

export interface SectionHeaderProps {
  title: string
  pretitle?: string
  subtitle?: string
}

const SectionHeader = ({ pretitle, title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col items-center">
      {pretitle && (
        <span className="uppercase text-sm tracking-tight font-bold font-heading text-white bg-primaryAlt-400 rounded-full px-2">
          {pretitle}
        </span>
      )}

      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-heading mt-2">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text sm:text-lg md:text-xl text-gray-600 max-w-2xl text-center">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
