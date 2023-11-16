import { Metadata } from 'next'
import {
  SeoLinkTag,
  SeoMetaTag,
  SeoOrFaviconTag,
  SeoTitleTag,
} from 'react-datocms/seo'

const isLink = (tag: SeoOrFaviconTag): tag is SeoLinkTag => tag.tag === 'link'
const isTitle = (tag: SeoOrFaviconTag): tag is SeoTitleTag =>
  tag.tag === 'title'
const isMeta = (tag: SeoOrFaviconTag): tag is SeoMetaTag => tag.tag === 'meta'

export const generateCmsSeo = (seo: SeoOrFaviconTag[]): Metadata => {
  const title = seo.find(isTitle)?.content || undefined
  const additionalLinkTags = seo.filter(isLink).map(({ attributes }) => ({
    ...attributes,
  }))

  const additionalMetaTags = seo
    .filter(isMeta)
    // We want to remove these tags and let NextSeo handle them
    .filter(({ attributes }) =>
      'name' in attributes
        ? !['twitter:title', 'twitter:description'].includes(attributes.name)
        : !['article:modified_time'].includes(attributes.property),
    )
    .map(({ attributes }) => ({
      ...attributes,
      key: 'name' in attributes ? attributes.name : attributes.property,
    }))

  return {}
}
