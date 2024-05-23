import { gql } from '@apollo/client'
import {
  BlogShowPageGetDataQuery,
  BlogShowPageGetDataQueryVariables,
} from '@generated/BlogShowPageGetDataQuery'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toNextMetadata } from 'react-datocms/seo'
import { humanizeDate } from '@lib/utils/date'
import Breadcrumbs from '@components/common/Breadcrumbs'
import Container from '@components/ui/Container'
import { Avatar, InlineMailingListSubscribe, Section } from '@components/common'
import { ArticleJsonLd, ArticleJsonLdProps } from 'next-seo'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import CmsStructuredTextTableOfContents from '@components/common/_dato-cms/CmsStructuredTextTableOfContents'
import CmsStructuredText from '@components/common/_dato-cms/CmsStructuredText'
import CmsResponsiveImage from '@components/common/_dato-cms/CmsResponsiveImage'

interface Params {
  articleSlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()
  const {
    data: { article },
  } = await client.query<
    BlogShowPageGetDataQuery,
    BlogShowPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      slug: {
        eq: params.articleSlug,
      },
    },
  })

  if (!article) {
    return notFound()
  }

  const cmsSeo = toNextMetadata(article._seoMetaTags)

  return {
    ...cmsSeo,
    openGraph: {
      ...cmsSeo.openGraph,
      url: routes.internal.learn.show.href(article.slug || ''),
    },
  }
}

const BlogShowPage = async ({ params }: { params: Params }) => {
  const client = await getClient()
  const {
    data: { article },
  } = await client.query<
    BlogShowPageGetDataQuery,
    BlogShowPageGetDataQueryVariables
  >({ query: GET_DATA, variables: { slug: { eq: params.articleSlug } } })

  if (!article?.content) {
    notFound()
  }

  const articleJsonLd: ArticleJsonLdProps = {
    useAppDir: true,
    authorName: article.author?.name || 'Stitchi',
    datePublished: article._publishedAt,
    title: article.title || 'Untitled',
    publisherLogo: makeAbsoluteUrl('/public/stitchi_logo.svg'),
    publisherName: 'Stitchi',
    url: article.slug ? routes.internal.learn.show.href(article.slug) : '',
    description: article._seoMetaTags?.find(
      tag => tag.attributes?.property === 'og:description',
    )?.attributes?.content,
    images: article.image?.image ? [article.image.image.src] : [],
    type: 'Article',
    dateModified: article._updatedAt,
  }

  return (
    <>
      <ArticleJsonLd {...articleJsonLd} />
      <Container className="!max-w-4xl ">
        <article className="prose prose-stone prose-headings:font-heading lg:prose-lg m-auto max-w-none prose-h1:md:text-6xl prose-h1:lg:text-7xl">
          <Section gutter="lg">
            <h1 className="text-center !mb-12">{article.title}</h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              {article.author && (
                <div className="not-prose">
                  <Author author={article.author} />
                </div>
              )}
              <div className="text-center">
                <time>
                  <span>{humanizeDate(article._createdAt)}</span>
                </time>
              </div>
            </div>

            {article.title && article.slug ? (
              <div className="!mb-20 flex justify-center sr-only sm:not-sr-only not-prose">
                <Breadcrumbs
                  useAppDir
                  breadcrumbs={[
                    {
                      label: 'Articles & Guides',
                      href: routes.internal.learn.href(),
                    },
                    {
                      label: article.title,
                      href: routes.internal.learn.show.href(article.slug),
                    },
                  ]}
                />
              </div>
            ) : null}
          </Section>

          {article.image?.responsiveImage && (
            <div className="not-prose mb-12 max-h-[60vh] overflow-hidden rounded-sm">
              <CmsResponsiveImage
                priority
                data={article.image.responsiveImage}
                lazyLoad={false}
                usePlaceholder={false}
                layout="responsive"
              />
            </div>
          )}

          <div className="relative mx-auto max-w-4xl">
            <div>
              <div>
                <section className="p-4 prose-a:text-current prose-a:no-underline hover:prose-a:underline bg-gray-100 rounded-sm ">
                  <div className="not-prose">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-headingDisplay font-bold text-gray-600 mt-0 mb-4">
                      Overview
                    </p>
                  </div>

                  <CmsStructuredTextTableOfContents content={article.content} />
                </section>
              </div>

              <div>
                <div className="mt-10">
                  <CmsStructuredText content={article.content} />
                </div>
              </div>
            </div>
          </div>
        </article>
        <Section gutter="md">
          <InlineMailingListSubscribe />
        </Section>
      </Container>
    </>
  )
}

const Author = ({
  author,
}: {
  author: NonNullable<
    NonNullable<BlogShowPageGetDataQuery['article']>['author']
  >
}) => {
  return (
    <address className="flex items-center">
      <div className="flex-shrink-0">
        <span className="sr-only">{author.name}</span>
        {author.image && <Avatar image={author.image} />}
      </div>

      <div className="ml-3">
        <p className="font-bold">{author.name}</p>
      </div>
    </address>
  )
}

export default BlogShowPage

const GET_DATA = gql`
  ${CmsResponsiveImage.fragments.image}
  ${CmsStructuredText.fragments.articleContent}
  ${Avatar.fragments.image}
  query BlogShowPageGetDataQuery($slug: SlugFilter!) {
    article(filter: { slug: $slug }) {
      id
      title
      slug
      _publishedAt
      _createdAt
      _seoMetaTags {
        attributes
        content
        tag
      }
      author {
        id
        name
        image {
          id
          ...AvatarImageFragment
        }
      }
      categories {
        id
        name
        slug
      }

      image {
        id
        responsiveImage(sizes: "700px") {
          ...CmsResponsiveImageFragment
        }
      }
      content {
        ...CmsStructuredTextContentFragment
      }
    }
  }
`
