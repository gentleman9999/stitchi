import { Button } from '@components/ui'
import Link from 'next/link'
import React from 'react'

interface BaseAction {
  label: string
  primary?: boolean
  disabled?: boolean
}

interface LinkAction extends BaseAction {
  href: string
}

interface ButtonAction extends BaseAction {
  onClick: () => void
}

type Action = LinkAction | ButtonAction

interface Props {
  actions: Action[]
}

const ClosetPageTitleActions = ({ actions }: Props) => {
  return (
    <div>
      {actions.map(action => {
        const shared = {
          children: action.label,
          slim: true,
          disabled: action.disabled,
          color: action.primary ? 'brandPrimary' : 'primary',
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
            <Button {...shared} key={action.label} onClick={action.onClick} />
          )
        }
      })}
    </div>
  )
}

export default ClosetPageTitleActions
