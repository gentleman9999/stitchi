import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

interface Props {
  children: React.ReactNode
}

const NavbarDropdown = ({ children }: Props) => {
  return (
    <div className="mt-2 bg-paper p-4 relative rounded-md focus:outline-none shadow-magical">
      {children}
    </div>
  )
}

export default NavbarDropdown
