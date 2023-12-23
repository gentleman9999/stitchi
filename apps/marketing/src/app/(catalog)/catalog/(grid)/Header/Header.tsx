import React from 'react'

interface Props {
  title: string | null
  description: string | null
}

const Header = ({ title, description }: Props) => {
  return (
    <>
      {title ? (
        <div className="bg-gray-100 p-6 rounded-md">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading">
            {title}
          </h1>

          {description ? (
            <div
              className="mt-2 text-sm sm:text-base text-gray-600 max-w-4xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
        </div>
      ) : (
        <h1 className="sr-only">Catalog</h1>
      )}
    </>
  )
}

export default Header
