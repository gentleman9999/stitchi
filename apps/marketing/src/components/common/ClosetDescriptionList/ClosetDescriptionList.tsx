import React from 'react'

interface Props {
  children: React.ReactNode[] | React.ReactNode
}

const ClosetDescriptionList = (props: Props) => {
  return (
    <div className="flex flex-col divide-y border-t">
      {Array.isArray(props.children) ? (
        <>
          {props.children.map((child, index) => {
            return (
              <div key={index} className="py-4">
                {child}
              </div>
            )
          })}
        </>
      ) : (
        <div className="py-4">{props.children}</div>
      )}
    </div>
  )
}

export default ClosetDescriptionList
