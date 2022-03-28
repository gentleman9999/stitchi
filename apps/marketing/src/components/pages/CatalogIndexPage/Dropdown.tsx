import React from 'react'
import { Fragment } from 'react'
import { Listbox, Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'icons'
import cx from 'classnames'
// import { ChevronDownIcon } from '@heroicons/react/solid'

interface DropdownOption {
  id: string
  label: string
  onClick: () => void
}

interface Props {
  options: DropdownOption[]
  defaultOption?: DropdownOption['id']
  placeholder?: string
}

const Dropdown = ({ options, placeholder }: Props) => {
  // return (
  //   <Listbox value={selected} onChange={setSelected}>
  //     {({ open }) => (
  //       <>
  //         <Listbox.Label className="sr-only">
  //           Change published status
  //         </Listbox.Label>
  //         <div className="relative">
  //           <div className="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
  //             <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
  //               <div className="relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
  //                 <CheckIcon className="h-5 w-5" aria-hidden="true" />
  //                 <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
  //               </div>
  //               <Listbox.Button className="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
  //                 <span className="sr-only">Change published status</span>
  //                 <ChevronDownIcon
  //                   className="h-5 w-5 text-white"
  //                   aria-hidden="true"
  //                 />
  //               </Listbox.Button>
  //             </div>
  //           </div>

  //           <Transition
  //             show={open}
  //             as={Fragment}
  //             leave="transition ease-in duration-100"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
  //               {options.map(option => (
  //                 <Listbox.Option
  //                   key={option.title}
  //                   className={({ active }) =>
  //                     classNames(
  //                       active ? 'text-white bg-indigo-500' : 'text-gray-900',
  //                       'cursor-default select-none relative p-4 text-sm',
  //                     )
  //                   }
  //                   value={option}
  //                 >
  //                   {({ selected, active }) => (
  //                     <div className="flex flex-col">
  //                       <div className="flex justify-between">
  //                         <p
  //                           className={
  //                             selected ? 'font-semibold' : 'font-normal'
  //                           }
  //                         >
  //                           {option.title}
  //                         </p>
  //                         {selected ? (
  //                           <span
  //                             className={
  //                               active ? 'text-white' : 'text-indigo-500'
  //                             }
  //                           >
  //                             <CheckIcon
  //                               className="h-5 w-5"
  //                               aria-hidden="true"
  //                             />
  //                           </span>
  //                         ) : null}
  //                       </div>
  //                       <p
  //                         className={classNames(
  //                           active ? 'text-indigo-200' : 'text-gray-500',
  //                           'mt-2',
  //                         )}
  //                       >
  //                         {option.description}
  //                       </p>
  //                     </div>
  //                   )}
  //                 </Listbox.Option>
  //               ))}
  //             </Listbox.Options>
  //           </Transition>
  //         </div>
  //       </>
  //     )}
  //   </Listbox>
  // )

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {placeholder || 'Options'}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-paper ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map(option => (
              <Menu.Item key={option.label} onClick={option.onClick}>
                {({ active }) => (
                  <span
                    className={cx(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    {option.label}
                  </span>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
