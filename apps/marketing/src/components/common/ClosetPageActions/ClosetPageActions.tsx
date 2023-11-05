import Button from '@components/ui/ButtonV2'
import { Dropdown, DropdownItem } from '@components/ui/Dropdown'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
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

interface DropdownAction extends BaseAction {
  actions: Action[]
}

export type Action = LinkAction | ButtonAction | DropdownAction

export interface Props {
  actions: Action[]
}

const ClosetPageActions = ({ actions }: Props) => {
  return (
    <div className="flex-shrink-0 flex gap-4">
      {actions.map(action => {
        const shared = {
          children: action.label,
          disabled: action.disabled,
          color: action.primary ? 'brandPrimary' : 'primary',
          variant: action.primary ? 'flat' : 'ghost',
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
        } else if ('onClick' in action) {
          return (
            <Button
              type="button" // default, can be overriden
              {...shared}
              key={action.label}
              onClick={action.onClick}
            />
          )
        } else {
          return (
            <Dropdown
              key={action.label}
              renderTrigger={() => (
                <Button
                  {...shared}
                  type="button"
                  endIcon={<ChevronDownIcon className="w-4 h-4" />}
                />
              )}
              renderItems={() =>
                action.actions.map(action => (
                  <DropdownItem {...action} key={action.label} />
                ))
              }
            />
          )
        }
      })}
    </div>
  )
}

export default ClosetPageActions
