import { Container } from '@/components/ui'
import getOrThrow from '@/utils/get-or-throw'
import { Metadata } from 'next'
import React from 'react'
import IssueList from './IssueList'

const siteName = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_NAME,
  'NEXT_PUBLIC_SITE_NAME',
)

export const metadata: Metadata = {
  title: `${siteName} Newsletter`,
  description:
    '"Unlock the world of promotional industry insights with our dynamic newsletter, delivering the latest news, trends, and tips right to your inbox. Stay ahead of the curve with expert strategies and exclusive deals to elevate your marketing campaigns.',
}

export default async function Page() {
  return (
    <Container>
      <section className="py-8 sm:py-12 md:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-2xl font-headingDisplay">
          What&apos;s happening in promo?
        </h1>
      </section>
      <IssueList />
    </Container>
  )
}
