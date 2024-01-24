import { type Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BlogClient } from 'seobot'

import '../blog.css'
import NotFound from '../components/NotFound'
import HighlightCode from '../components/HighlightCode'
import getOrThrow from '@lib/utils/get-or-throw'
import { SITE_URL } from '@lib/constants'

async function getPost(slug: string) {
  const key = getOrThrow(process.env.SEOBOT_API_KEY, 'SEOBOT_API_KEY')

  const client = new BlogClient(key)
  return client.getArticle(slug)
}

const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const post = await getPost(slug)
  if (!post) return {}

  const title = post.headline
  const description = post.metaDescription
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      images: [post.image],
      url: `${SITE_URL}/blog/${slug}`,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [post.image],
    },
  }
}

const Article = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await getPost(slug)
  if (!post) return <NotFound />

  return (
    <section className="article max-w-2xl lg:my-8 mx-auto px-4 md:px-8 ">
      {post.category ? (
        <div className="flex flex-wrap items-center gap-2 mb-1 w-full text-sm">
          <a href="/">Home</a>
          <svg
            width="12"
            height="12"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
            />
          </svg>
          <Link href="/blog/">Blog</Link>
          <svg
            width="12"
            height="12"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
            />
          </svg>
          <Link href={`/blog/category/${post.category.slug}`}>
            {post.category.title}
          </Link>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2 items-center w-full text-sm">
        <span>
          Published{' '}
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
            'en-US',
            { day: 'numeric', month: 'short', year: 'numeric' },
          )}
        </span>
        {post.readingTime ? (
          <span>{` ⦁ ${post.readingTime}`} min read</span>
        ) : null}
      </div>
      <div className="relative flex justify-center items-center w-full aspect-video mt-2 text-center rounded-xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.headline}
          layout="fill"
          objectFit="cover"
          className="!inset-auto"
        />
      </div>
      <div
        className="prose prose-h1:text-slate-100 prose-h2:text-slate-100 prose-h3:text-slate-100 prose-strong:text-slate-100 mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></div>
      <div className="flex flex-wrap gap-2 justify-start w-full">
        {(post.tags || []).map((t: any, ix: number) => (
          <a
            key={ix}
            href={`/blog/tag/${t.slug}`}
            className="px-3 rounded text-sm"
          >
            {t.title}
          </a>
        ))}
      </div>
      {post.relatedPosts?.length ? (
        <div>
          <h2>Related posts</h2>
          <ul className="text-base">
            {post.relatedPosts.map((p: any, ix: number) => (
              <li key={ix}>
                <a href={`/blog/${p.slug}`}>{p.headline}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <HighlightCode />
    </section>
  )
}

export { generateMetadata }
export default Article
