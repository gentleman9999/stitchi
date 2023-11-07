import Logo from '@components/ui/Logo'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm min-h-[400px] border-md bg-paper shadow-xl flex flex-col gap-8 p-8 rounded-lg items-center justify-center">
        <Logo className="w-16" />

        <h2 className="text-xl font-semibold text-gray-800">
          Select an organization
        </h2>

        {children}
      </div>
    </div>
  )
}

export default Layout
