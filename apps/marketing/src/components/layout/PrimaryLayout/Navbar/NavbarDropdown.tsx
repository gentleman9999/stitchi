import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface Props {
  children: React.ReactNode
  open: boolean
  onClose: () => void
  anchorEl?: HTMLElement | null
}

const NavbarDropdown = ({ children, open, onClose, anchorEl }: Props) => {
  const [dims, setDims] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    const update = () => {
      if (anchorEl) {
        setDims(anchorEl.getBoundingClientRect())
      }
    }

    update()

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [anchorEl])

  if (!dims) {
    return null
  }

  const handleClose = () => {
    if (open) {
      onClose()
    }
  }

  return (
    <Transition
      as={Fragment}
      show={open}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Dialog
        onClose={handleClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0" />
        <div
          className="mt-2 bg-white p-4 relative rounded-md focus:outline-none shadow-magical"
          style={{
            left: dims.left,
            width: dims.width,
            top: dims.top + dims.height,
          }}
        >
          {children}
        </div>
      </Dialog>
    </Transition>
  )
}

export default NavbarDropdown
