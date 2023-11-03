import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
      This is some panel content
      <Link href="/closet/test">Close nested panel</Link>
    </>
  )
}

export default Page
