import React from 'react'
import cx from 'classnames'

export interface SectionHeaderProps {
  title?: React.ReactNode
  pretitle?: string
  subtitle?: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

const SectionHeader = ({
  pretitle,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) => {
  const SubtitleComponent = typeof subtitle === 'string' ? 'p' : 'div'

  return (
    <div
      className={cx('flex flex-col', {
        'items-center text-center': align === 'center',
        'text-left items-start': align === 'left',
        'text-right items-end': align === 'right',
      })}
    >
      {pretitle && (
        <span className="text-md tracking-tight font-bold font-heading text-black bg-primary rounded-full px-4">
          {pretitle}
        </span>
      )}

      {title && (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-heading">
            {title}
          </h2>
        </>
      )}

      {subtitle && (
        <>
          <SubtitleComponent className="text sm:text-lg md:text-xl text-gray-600 max-w-2xl mt-6">
            {subtitle}
          </SubtitleComponent>
        </>
      )}
    </div>
  )
}

export default SectionHeader
