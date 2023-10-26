import React from 'react'

interface Item {
  label: string
  description: string
}

interface Props {
  items: Item[]
}

const DescriptionList = ({ items }: Props) => {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <LeftCell>{item.label}</LeftCell>
            <RightCell>{item.description}</RightCell>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const LeftCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border-y border-x-0 border-gray-100 border-solid py-3 pr-2 text-left">
    {children}
  </td>
)

const RightCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border-y border-x-0 border-gray-100 border-solid py-3 pl-2 text-right font-medium">
    {children}
  </td>
)

export default DescriptionList
