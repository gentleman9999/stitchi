import React from 'react'

const colorOptions = [
  { label: 'Black', value: 'black', hex: '#000000' },
  { label: 'White', value: 'white', hex: '#ffffff' },
  { label: 'Red', value: 'red', hex: '#ff0000' },
]

const sizeOptions = [
  { label: 'X-Small', value: 'x-small' },
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
  { label: 'X-Large', value: 'x-large' },
]

const columns = sizeOptions.length + 1

const VariantQuanittyMatrixForm = () => {
  return (
    <>
      <div
        className="w-full grid mb-1"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        <div className="" />
        {sizeOptions.map(size => (
          <div key={size.value} className="text-center text-sm text-gray-600">
            {size.label}
          </div>
        ))}
      </div>
      <ul className="">
        {colorOptions.map(color => (
          <li
            key={color.value}
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            <div className="flex items-center text-sm font-medium">
              <div
                className="w-6 h-6 rounded-full border mr-2"
                style={{ backgroundColor: color.hex }}
              />
              {color.label}
            </div>
            {sizeOptions.map(size => (
              <div key={size.value} className="p-1">
                <input className="w-full border rounded-sm border-gray-200 text-center py-1 text-sm" />
              </div>
            ))}
          </li>
        ))}
      </ul>

      <hr className="my-2" />

      <div className="text-sm text-right">
        Total quantity <b>0</b>
      </div>
    </>
  )
}

export default VariantQuanittyMatrixForm
