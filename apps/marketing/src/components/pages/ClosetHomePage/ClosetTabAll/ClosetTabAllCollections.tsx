import React from 'react'
import cx from 'classnames'

const projects = [
  {
    name: 'Graph API',
    initials: 'GA',
    bgColor: 'bg-red-600',
    members: 16,
    href: '#',
  },
  {
    name: 'Component Design',
    initials: 'CD',
    bgColor: 'bg-purple-600',
    members: 12,
    href: '#',
  },
  {
    name: 'Templates',
    initials: 'T',
    bgColor: 'bg-blue-500',
    members: 16,
    href: '#',
  },
  {
    name: 'React Native',
    initials: 'RN',
    bgColor: 'bg-green-500',
    members: 8,
    href: '#',
  },
]

interface Props {}

const ClosetTabAllCollections = ({}: Props) => {
  return (
    <ul
      role="list"
      className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
    >
      {projects.map(project => (
        <li key={project.name} className="col-span-1 flex rounded-md shadow-sm">
          <div
            className={cx(
              project.bgColor,
              'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
            )}
          >
            {project.initials}
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <a
                href={project.href}
                className="font-medium text-gray-900 hover:text-gray-600"
              >
                {project.name}
              </a>
              <p className="text-gray-500">{project.members} Members</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ClosetTabAllCollections
