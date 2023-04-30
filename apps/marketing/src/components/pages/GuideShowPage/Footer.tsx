import GridPattern from '@components/ui/GridPattern'
import React from 'react'

const Footer = () => {
  return (
    <footer className="relative pb-20 pt-5 sm:pb-32 sm:pt-14">
      <div className="absolute inset-x-0 top-0 h-32 text-gray-900/10 [mask-image:linear-gradient(white,transparent)]">
        <GridPattern x="50%" />
      </div>
      <div className="relative text-center text-sm text-gray-600">
        <p>Copyright &copy; {new Date().getFullYear()} Stitchi, LLC</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
