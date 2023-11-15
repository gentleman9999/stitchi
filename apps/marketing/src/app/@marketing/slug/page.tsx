import { notFound } from 'next/navigation'
import React from 'react'

interface Params {
  slug: string
}

export const dynamic = 'error'

const Page = ({ params }: { params: Params }) => {
  notFound()
}

export default Page
