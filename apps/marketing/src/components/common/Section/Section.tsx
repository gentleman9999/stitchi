import React from 'react'
import cx from 'classnames'

export interface SectionProps {
  label: string
  children: React.ReactNode
  className?: string
  gutter?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

const Section = (props: SectionProps) => {
  return (
    <section
      id={props.id}
      aria-label={props.label}
      className={cx(props.className, {
        ['py-3 sm:py-4 md:py-5 lg:py-6']: props.gutter === 'sm',
        ['py-6 sm:py-8 md:py-10 lg:py-12']: props.gutter === 'md',
        ['py-12 sm:py-16 md:py-20 lg:py-24']: props.gutter === 'lg',
        ['py-24 sm:py-32 md:py-40 lg:py-48']: props.gutter === 'xl',
      })}
    >
      {props.children}
    </section>
  )
}

export default Section
