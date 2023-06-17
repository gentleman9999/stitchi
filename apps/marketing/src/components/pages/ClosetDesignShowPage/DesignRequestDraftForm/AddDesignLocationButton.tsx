import React from 'react'

interface Props {
  onClick: () => void
}

const AddDesignLocationButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-gray-100 ring-1 ring-gray-900/5 px-3 w-full"
    >
      <div
        className="py-6 text-sm font-semibold leading-6 text-gray-900"
        onClick={onClick}
      >
        Add location <span aria-hidden="true">+</span>
      </div>
    </button>
  )
}

export default AddDesignLocationButton
