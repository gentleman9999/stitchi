import React from 'react'
import Image, { StaticImageData } from 'next/legacy/image'
import cx from 'classnames'

export interface SpokespersonProps {
  headshot: StaticImageData
  name: string
  title: string
  light?: boolean
}

const Spokesperson = (props: SpokespersonProps) => {
  return (
    <div className="flex flex-col items-start md:flex-row">
      <div className="mt-3 text-center md:mt-0 md:flex md:items-center">
        <div
          className={cx('text-base font-medium', {
            ['text-gray-900']: !props.light,
            ['text-gray-100']: props.light,
          })}
        >
          {props.name}
        </div>

        <svg
          className={cx(
            'hidden md:block mx-1 h-5 w-5 text-indigo-600 fill-black',
            {
              'fill-white': props.light,
            },
          )}
          viewBox="0 0 20 20"
        >
          <path d="M11 0h3L9 20H6l5-20z" />
        </svg>

        <div
          className={cx('text-base font-medium', {
            ['text-gray-500']: !props.light,
            ['text-gray-100']: props.light,
          })}
        >
          {props.title}
        </div>
      </div>
    </div>
  )
}

export default Spokesperson
