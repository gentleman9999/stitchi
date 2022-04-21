import { Popover, Transition } from '@headlessui/react'
import { Adjustments, XIcon } from 'icons'
import React from 'react'
import CatalogIndexPageFilterSummary from '../CatalogIndexPageFilterSummary'
import Desktop from './Desktop'
import Mobile from './Mobile'

interface Props {}

const CatalogIndexPageFilters = ({}: Props) => {
  return (
    <>
      <nav>
        <div className="hidden sm:block">
          <Desktop />
          <div className="mt-8 ">
            <CatalogIndexPageFilterSummary />
          </div>
        </div>

        <Popover>
          {({ open }) => (
            <div className="sm:hidden">
              <div className="flex items-center mt-8">
                <CatalogIndexPageFilterSummary />

                <Popover.Button className="ml-auto flex items-center">
                  {/* Mobile menu button*/}
                  <div className="ml-auto inline-flex items-center justify-center p-2 rounded-md text-gray-400">
                    <span className="sr-only">Open main menu</span>
                    <div className="p-1 rounded-full ring-1 ring-gray-900">
                      <Adjustments
                        className="block h-6 w-6 rotate-90 stroke-gray-900"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Popover.Button>
              </div>

              <Transition show={open}>
                <div className="sm:hidden fixed inset-0 z-50 overflow-y-auto">
                  <div className="min-h-screen">
                    <Transition.Child
                      enter="transition duration-500 ease-in-out"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition duration-200 ease-out"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 bg-black opacity-40" />
                    </Transition.Child>
                  </div>

                  <Transition.Child
                    enter="transition duration-3000 ease-in-out"
                    enterFrom="transform translate-y-[500px]"
                    enterTo="transform translate-y-0"
                    leave="transition duration-2000 ease-in-out"
                    leaveFrom="transform translate-y-0"
                    leaveTo="transform translate-y-[500px]"
                  >
                    <Popover.Panel className="bg-white rounded-t-2xl p-8 absolute bottom-0 left-0 right-0 z-10">
                      <Popover.Button className="block ml-auto">
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      </Popover.Button>

                      <Mobile />
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition>
            </div>
          )}
        </Popover>
      </nav>
    </>
  )
}

export default CatalogIndexPageFilters
