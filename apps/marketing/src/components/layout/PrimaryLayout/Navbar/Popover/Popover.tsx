import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

interface Props {
  ButtonChildren: React.ComponentType<{ active: boolean }>
  panelChildren: React.ReactNode
  anchorEl: HTMLElement | null
}

const Dropdown = ({ anchorEl, ButtonChildren, panelChildren }: Props) => {
  const [anchorDims, setAnchorDims] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    const update = () => {
      if (anchorEl) {
        setAnchorDims(anchorEl.getBoundingClientRect())
      }
    }

    update()

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [anchorEl])

  if (!anchorDims) {
    return null
  }

  return (
    <Popover className="inline-flex">
      {({ open }) => (
        <>
          <Popover.Button>
            <ButtonChildren active={open} />
          </Popover.Button>
          <Popover.Overlay />

          <Transition
            unmount={false}
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              unmount={false}
              className="fixed z-50"
              style={{
                left: anchorDims.left,
                width: anchorDims.width,
                top: anchorDims.top + anchorDims.height,
              }}
            >
              <div className="mt-2 bg-white p-4 relative rounded-md focus:outline-none shadow-magical">
                {panelChildren}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Dropdown
