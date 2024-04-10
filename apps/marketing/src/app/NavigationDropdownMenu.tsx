'use client'

import { DropdownMenu } from '@components/ui/dropdown-menu'
import React from 'react'
import { NavigationDropdownMenuContent } from './NavigationDropdown'

interface Props {
  trigger: React.ReactElement
  children: React.ReactNode
}

const NavigationDropdownMenu = (props: Props) => {
  const [open, setOpen] = React.useState(false)

  const [leaveTimer, setLeaveTimer] = React.useState<NodeJS.Timeout | null>(
    null,
  )

  const handleMouseEnter = () => {
    // Clear the timer if it's set when mouse enters, stopping the closing process
    if (leaveTimer) {
      clearTimeout(leaveTimer)
      setLeaveTimer(null)
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, 150)
    setLeaveTimer(timer)
  }

  React.useEffect(() => {
    return () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer)
      }
    }
  }, [leaveTimer])

  const Trigger = React.cloneElement(props.trigger, {})

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {Trigger}

        <NavigationDropdownMenuContent
          forceMount // Ensure the content is always rendered for SEO
          side="bottom"
          sideOffset={0}
          align="end"
          alignOffset={-20}
          collisionPadding={8}
        >
          <div className="mt-4 overflow-hidden rounded-md bg-white p-1 text-gray-950 shadow-lg">
            {props.children}
          </div>
        </NavigationDropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}

export default NavigationDropdownMenu
