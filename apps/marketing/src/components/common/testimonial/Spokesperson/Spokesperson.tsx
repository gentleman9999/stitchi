import React from 'react'
import Image from 'next/image'
import cx from 'classnames'

export interface SpokespersonProps {
  headshot: StaticImageData
  name: string
  title: string
  light?: boolean
}

const Spokesperson = (props: SpokespersonProps) => {
  return (
    <div className="md:flex md:items-center md:justify-center">
      <div className="md:flex-shrink-0">
        <Image
          {...props.headshot}
          alt={`${props.name} headshot`}
          width={50}
          height={50}
          className="mx-auto h-10 w-10 rounded-full"
        />
      </div>
      <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
        <div
          className={cx('text-base font-medium', {
            ['text-gray-900']: !props.light,
            ['text-gray-100']: props.light,
          })}
        >
          {props.name}
        </div>

        <svg
          className="hidden md:block mx-1 h-5 w-5 text-indigo-600"
          fill="currentColor"
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