import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import cx from 'classnames'
import Container from '@components/ui/Container'

interface Props {
  ButtonChildren: React.ComponentType<{ active: boolean }>
  panelChildren: React.ReactNode
  anchorEl: HTMLElement | null
  overlayVisible?: boolean
}

const Dropdown = ({
  anchorEl,
  ButtonChildren,
  panelChildren,
  overlayVisible,
}: Props) => {
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

  return (
    <Popover className="inline-flex">
      {({ open }) => (
        <>
          <Popover.Button className="focus-visible:outline-none">
            <ButtonChildren active={open} />
          </Popover.Button>
          <Popover.Overlay
            className={cx('fixed inset-0', {
              'bg-gray-700 opacity-10': overlayVisible,
            })}
          />

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
                left: anchorDims?.left,
                width: anchorDims?.width,
                top: anchorDims
                  ? anchorDims.top + anchorDims.height
                  : undefined,
              }}
            >
              <Container>
                <div className="mt-2 bg-white p-4 relative rounded-sm focus:outline-none shadow-md">
                  {panelChildren}
                </div>
              </Container>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Dropdown
