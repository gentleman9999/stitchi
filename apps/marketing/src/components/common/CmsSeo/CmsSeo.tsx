import { gql } from '@apollo/client'
import { CmsSeoTagsFragment } from '@generated/CmsSeoTagsFragment'
import { NextSeo } from 'next-seo'
import React from 'react'
import {
  SeoLinkTag,
  SeoMetaTag,
  SeoOrFaviconTag,
  SeoTitleTag,
} from 'react-datocms'

const isLink = (tag: SeoOrFaviconTag): tag is SeoLinkTag => tag.tag === 'link'
const isTitle = (tag: SeoOrFaviconTag): tag is SeoTitleTag =>
  tag.tag === 'title'
const isMeta = (tag: SeoOrFaviconTag): tag is SeoMetaTag => tag.tag === 'meta'

export interface CmsSeoProps {
  seo: CmsSeoTagsFragment[]
  canonicalUrl: string
}

/**
 * We ned to use NextSeo here instead of DatoCmsReactSeo.
 * This is because NextSeo has guards around meta tags that share the same name.
 * So when we have pages that aren't backed by DatoCms, we need to use NextSeo.
 * Using DatoCmsReactSeo would cause several meta tags for the same property to be rendered.
 */
const CmsSeo = (props: CmsSeoProps) => {
  const seo = props.seo as SeoOrFaviconTag[]
  return (
    <NextSeo
      title={seo.find(isTitle)?.content || undefined}
      openGraph={{
        url: props.canonicalUrl,
      }}
      additionalLinkTags={
        seo.filter(isLink).map(({ attributes }) => ({
          ...attributes,
        })) as any
      }
      additionalMetaTags={
        seo.filter(isMeta).map(({ attributes }) => ({
          ...attributes,
          key: 'name' in attributes ? attributes.name : attributes.property,
        })) as any
      }
      canonical={props.canonicalUrl}
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
