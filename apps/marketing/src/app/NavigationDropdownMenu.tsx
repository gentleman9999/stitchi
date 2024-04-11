'use client'

import { useDropdownGroup } from '@components/common/DropdownGroup'
import { cn } from '@lib/utils'
import React, { useId } from 'react'

interface Props {
  trigger: React.ReactElement
  children: React.ReactNode
  as?: React.ElementType
}

const NavigationDropdownMenu = (props: Props) => {
  const { as: Component = 'li' } = props

  const { activeDropdownId, setActiveDropdownId } = useDropdownGroup()
  const dropdownId = useId()
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const [triggerPosition, setTriggerPosition] = React.useState<{
    top: number
    left: number
  }>({ top: 0, left: 0 })

  const handleClose = () => {
    setActiveDropdownId(null)
  }

  const handleToggle = () => {
    if (activeDropdownId === dropdownId) {
      handleClose()
    } else {
      setActiveDropdownId(dropdownId)
    }
  }

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return
      if (activeDropdownId === dropdownId) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          e.preventDefault()
          e.stopPropagation()
          handleClose()
        }
      }
    },
    [activeDropdownId, dropdownId],
  )

  const handleSetTriggerPosition = React.useCallback(() => {
    if (triggerRef.current) {
      const { top, left } = triggerRef.current.getBoundingClientRect()
      setTriggerPosition({ top, left })
    }
  }, [])

  React.useEffect(() => {
    handleSetTriggerPosition()
  }, [handleSetTriggerPosition])

  React.useEffect(() => {
    document.addEventListener('scroll', handleSetTriggerPosition)

    return () => {
      document.removeEventListener('scroll', handleSetTriggerPosition)
    }
  }, [handleSetTriggerPosition])

  React.useEffect(() => {
    document.addEventListener('resize', handleSetTriggerPosition)

    return () => {
      document.removeEventListener('resize', handleSetTriggerPosition)
    }
  }, [handleSetTriggerPosition])

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const Trigger = React.cloneElement(props.trigger, {
    id: dropdownId,
    'aria-haspopup': 'true',
    'aria-label': 'Toggle dropdown menu',
    'aria-expanded': activeDropdownId === dropdownId,
    'aria-controls': dropdownId,
    ref: triggerRef,
    type: 'button',
    onClick: () => handleToggle(),
    onMouseEnter: () => setActiveDropdownId(dropdownId),
  })

  return (
    <Component className="flex ">
      {Trigger}

      <div
        id={dropdownId}
        ref={dropdownRef}
        style={{
          top: triggerPosition.top + 16,
          left: triggerPosition.left,
        }}
        className={cn('sr-only fixed', {
          'not-sr-only': activeDropdownId === dropdownId,
        })}
      >
        <div className="mt-4 overflow-hidden rounded-md bg-white p-1 text-gray-950 shadow-lg">
          {props.children}
        </div>
      </div>
    </Component>
  )
}

export default NavigationDropdownMenu
