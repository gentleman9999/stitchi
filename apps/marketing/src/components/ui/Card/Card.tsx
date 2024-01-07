import React from 'react'
import cx from 'classnames'
import { CardProvider, useCardContext } from './card-context'
import CardCollapsableRoot from './CardCollapsableRoot'

interface Props {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

const withCardContext = (Component: React.ComponentType<Props>) => {
  const CardWithContext = (
    props: Props & {
      collapsable?: boolean
      defaultCollapsed?: boolean
    },
  ) => {
    const { collapsable = false, defaultCollapsed = false } = props

    return (
      <CardProvider
        collapsable={collapsable}
        defaultCollapsed={defaultCollapsed}
      >
        <Component {...props} />
      </CardProvider>
    )
  }

  return CardWithContext
}

const Card = ({ children, className, disabled }: Props) => {
  return (
    <CardCollapsableRoot>
      <div
        className={cx(
          'relative group overflow-hidden rounded-sm bg-white sm:border flex flex-col pb-4',
          {
            'opacity-50 pointer-events-none': disabled,
          },
          className,
        )}
      >
        {children}
      </div>
    </CardCollapsableRoot>
  )
}

export default withCardContext(Card)
