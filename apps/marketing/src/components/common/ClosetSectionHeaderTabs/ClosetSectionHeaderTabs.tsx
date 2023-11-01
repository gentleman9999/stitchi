'use client'

import React from 'react'
import cx from 'classnames'
import { useClosetSectionContext } from '../ClosetSection/closet-section-context'
import Link from 'next/link'

interface Props {}

const ClosetSectionHeaderTabs = ({}: Props) => {
  const { tabs, activeTab, setActiveTab } = useClosetSectionContext()

  return (
    <div>
      <div className="sm:hidden mb-4">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={activeTab?.id}
          onChange={e => setActiveTab(e.target.value)}
        >
          {tabs.map(tab => (
            <option key={tab.label} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map(tab => (
              <Link
                key={tab.label}
                href={tab.href}
                className={cx(
                  activeTab?.id === tab.id
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium',
                )}
                aria-current={activeTab?.id === tab.id ? 'page' : undefined}
              >
                <span>{tab.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default ClosetSectionHeaderTabs
