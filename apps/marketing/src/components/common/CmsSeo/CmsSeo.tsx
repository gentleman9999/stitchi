import { gql } from '@apollo/client'
import { CmsSeoTagsFragment } from '@generated/CmsSeoTagsFragment'
import { NextSeo, NextSeoProps } from 'next-seo'
import { MetaTag } from 'next-seo/lib/types'
import Head from 'next/head'
import React from 'react'
import { SeoMetaTagType } from 'react-datocms'

export interface CmsSeoProps {
  seo: SeoMetaTagType[]
}

/**
 * We ned to use NextSeo here instead of DatoCmsReactSeo.
 * This is because NextSeo has guards around meta tags that share the same name.
 * So when we have pages that aren't backed by DatoCms, we need to use NextSeo.
 * Using DatoCmsReactSeo would cause several meta tags for the same property to be rendered.
 */
const CmsSeo = ({ seo }: CmsSeoProps) => {
  return (
    <NextSeo
      additionalLinkTags={
        seo
          .filter(({ tag }) => tag === 'link')
          .map(({ attributes }) => ({
            ...attributes,
            key: attributes?.property,
          })) as any
      }
      additionalMetaTags={
        seo
          .filter(({ tag }) => tag === 'meta')
          .map(({ attributes }) => ({
            ...attributes,
            key: attributes?.property,
          })) as any
      }
    />
  )
}

CmsSeo.fragments = {
  seoTags: gql`
    fragment CmsSeoTagsFragment on Tag {
      attributes
      content
      tag
    }
  `,
}

export default CmsSeo
