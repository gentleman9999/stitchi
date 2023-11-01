import React from 'react'
import cx from 'classnames'
import * as Collapsible from '@radix-ui/react-collapsible'
import { CardProvider, useCardContext } from './card-context'

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
  const { collapsed, setCollapsed } = useCardContext()

  return (
    <Collapsible.Root
      open={!collapsed}
      onOpenChange={open => setCollapsed(!open)}
    >
      <div
        className={cx(
          'relative group overflow-hidden rounded-md bg-white sm:border flex flex-col pb-4',
          {
            'opacity-50 pointer-events-none': disabled,
          },
          className,
        )}
      >
        {children}
      </div>
    </Collapsible.Root>
  )
}

export default withCardContext(Card)
