'use client'

import { Transition } from '@headlessui/react'
import React, { Fragment, Ref, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@components/ui/popover'
import { autoPlacement, shift, useFloating } from '@floating-ui/react-dom'

interface Props {
  trigger: React.ReactElement
  children: React.ReactNode
  as?: React.ElementType
}

const NavigationDropdownMenu = (props: Props) => {
  const { as = 'li' } = props

  const { refs, floatingStyles } = useFloating({
    strategy: 'fixed',
    placement: 'bottom-start',
    middleware: [
      shift({
        mainAxis: true,
        padding: 8,
      }),
    ],
  })

  return (
    <Popover className="relative" as={as}>
      <PopoverButton as={Fragment} ref={refs.setReference}>
        {props.trigger}
      </PopoverButton>

      <Transition
        as={Fragment}
        unmount={false}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          unmount={false}
          ref={refs.setFloating}
          style={floatingStyles}
          // className="absolute left-1/2 z-10 mt-0 flex w-screen max-w-max -translate-x-1/2 px-4"
        >
          <div className="mt-4 overflow-hidden rounded-md bg-white p-1 text-gray-950 shadow-lg">
            {props.children}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}

export default NavigationDropdownMenu
