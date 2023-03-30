import { Container } from '@/components/ui'
import React from 'react'
import Directory from './Directory'

export default async function Page() {
  return (
    <>
      <Container>
        <div className="py-20">
          <h1 className="text-7xl font-bold max-w-2xl font-headingDisplay">
            Discover the companies behind the world&apos;s best products
          </h1>
        </div>
        <Directory />
      </Container>
    </>
  )
}
