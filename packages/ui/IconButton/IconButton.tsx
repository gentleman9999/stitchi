import React from 'react'

export interface IconButtonProps {
  children: React.ReactNode
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

const IconButton = (props: IconButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const handleClick: IconButtonProps['onClick'] = e => {
    ref.current.blur()
    props.onClick?.(e)
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className="p-2 hover:bg-primary-s transition-all rounded-md focus:bg-primary-light"
    >
      {props.children}
    </button>
  )
}

export default IconButton
