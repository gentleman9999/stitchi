import { ChevronDownIcon } from '@heroicons/react/20/solid'
import * as Collapsible from '@radix-ui/react-collapsible'
import React from 'react'
import cx from 'classnames'
import { useCardContext } from './card-context'

interface Props {
  children: React.ReactNode
}

const CardHeader = ({ children }: Props) => {
  const { collapsed, collapsable } = useCardContext()

  return (
    <Collapsible.Trigger asChild>
      <div className="pt-4 px-4 flex justify-between items-center gap-2 cursor-pointer">
        <div className="flex-1">{children}</div>
        {collapsable ? (
          <button className="p-1 rounded-full bg-gray-100">
            <ChevronDownIcon
              className={cx('w-5 h-5 transition-all', {
                'rotate-180': !collapsed,
              })}
            />
          </button>
        ) : null}
      </div>
    </Collapsible.Trigger>
  )
}

export default CardHeader
