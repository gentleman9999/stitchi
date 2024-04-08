import routes from '@lib/routes'
import { Metadata } from 'next'
import React from 'react'
import IndustryTermsIndexPage from './IndustryTermsIndexPage'

export const metadata: Metadata = {
  title: 'Promotional Product Industry Terms and Definitions',
  description:
    'Get a better understanding of the promotional product industry with this comprehensive list of terms and definitions. From common acronyms to specialized terminology, this page has everything you need to know to navigate the world of promotional products and custom merchandise.',
  openGraph: { url: routes.internal.glossary.href() },
}

const PromotionalProductGlossary = () => {
  return <IndustryTermsIndexPage />
}

export default PromotionalProductGlossary
