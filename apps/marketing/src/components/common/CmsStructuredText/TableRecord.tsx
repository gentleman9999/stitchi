import React from 'react'
import { Expand } from 'icons'
import * as Portal from '@radix-ui/react-portal'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

const tdClassName = 'px-3 py-3.5'

interface Table {
  columns: string[]
  data: Record<string, string>[]
}

interface Props {
  table: Table
}

const TableRecord = ({ table }: Props) => {
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    // Disable scrolling the body
    if (expanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [expanded])

  const Table = () => {
    return (
      <div className="not-prose bg-gray-900 rounded-sm relative border border-white/20">
        <div className="overflow-auto p-1 sm:p-2 md:p-4 lg:p-8">
          <table className="min-w-full divide-y divide-gray-300 text-left whitespace-nowrap ">
            <thead className="border-b border-white/10 text-sm leading-6 text-white">
              <tr>
                {table.columns.map(column => (
                  <th key={column} className={`${tdClassName} font-semibold `}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-white">
              {table.data.map((row, index) => (
                <tr key={index}>
                  {table.columns.map(column => (
                    <td key={column} className={`${tdClassName}`}>
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="absolute top-1 right-1"
          onClick={() => setExpanded(prev => !prev)}
        >
          <Expand
            className={cx('text-white w-6 h-6 hover:scale-110 transition-all', {
              'hover:scale-110': !expanded,
              'scale-110 hover:scale-100': expanded,
            })}
          />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className={expanded ? 'opacity-0' : ''}>
        <Table />
      </div>
      {expanded ? (
        <Portal.Root asChild>
          <div className="fixed top-0 left-0 bottom-0 right-0 z-50 p-1 sm:p2 md:p-3 lg:p-4 flex items-center justify-center">
            <motion.div
              className="absolute top-0 left-0 bottom-0 right-0 bg-gray-900/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <motion.div
              className="w-full"
              initial={{
                scale: 0,
              }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                bounce: 0.2,
              }}
            >
              <Table />
            </motion.div>
          </div>
        </Portal.Root>
      ) : null}
    </>
  )
}
export default TableRecord
