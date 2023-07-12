import Button from '@components/ui/ButtonV2'
import Link from 'next/link'
import React from 'react'

interface BaseAction {
  label: string
  primary?: boolean
  disabled?: boolean
  loading?: boolean
}

interface LinkAction extends BaseAction {
  href: string
}

interface ButtonAction extends BaseAction {
  onClick: () => void
}

export type Action = LinkAction | ButtonAction

interface Props {
  actions: Action[]
}

const ClosetPageActions = ({ actions }: Props) => {
  return (
    <div className="flex-shrink-0 flex gap-6">
      {actions.map(action => {
        const shared = {
          children: action.label,
          disabled: action.disabled,
          color: action.primary ? 'brandPrimary' : 'primary',
          variant: action.primary ? 'flat' : 'naked',
          loading: action.loading,
          size: 'xl',
        } as const

        if ('href' in action) {
          return (
            <Button
              {...shared}
              key={action.label}
              Component={Link}
              href={action.href}
            />
          )
        } else {
          return (
            <Button
              type="button" // default, can be overriden
              {...shared}
              key={action.label}
              onClick={action.onClick}
            />
          )
        }
      })}
    </div>
  )
}

export default ClosetPageActions
