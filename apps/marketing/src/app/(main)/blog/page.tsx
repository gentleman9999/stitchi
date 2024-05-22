import { type Metadata } from 'next'
import { BlogClient } from 'seobot'
import ArticleCard from './components/ArticleCard'
import Pagination from './components/Pagination'
import getOrThrow from '@lib/utils/get-or-throw'
import { COMPANY_NAME, SITE_URL } from '@lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const title = `${COMPANY_NAME} Blog`
  const description = `Get the inside scoop on ${COMPANY_NAME} - the merch platform for designing and fulfilling custom branded merchandise.`
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/blog',
    },
    openGraph: {
      type: 'website',
      title,
      description,
      // images: [],
      url: `${SITE_URL}/blog`,
    },
    twitter: {
      title,
      description,
      // card: 'summary_large_image',
      // images: [],
    },
  }
}

async function getPosts(page: number) {
  const key = getOrThrow(
    process.env.SEOBOT_API_KEY,
    'SEOBOT_API_KEY enviroment variable must be set.',
  )

  const client = new BlogClient(key)
  return client.getArticles(page, 10)
}

const Blog = async ({
  searchParams: { page },
}: {
  searchParams: { page: number }
}) => {
  const pageNumber = Math.max((page || 0) - 1, 0)
  const { total, articles } = await getPosts(pageNumber)
  const posts = articles || []
  const lastPage = Math.ceil(total / 10)

  return (
    <section className="max-w-3xl my-8 lg:mt-10 mx-auto px-4 md:px-8 tracking-normal">
      <h1 className="text-4xl my-4 font-black">{COMPANY_NAME} Blog</h1>
      <ul>
        {posts.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
      {lastPage > 1 && (
        <Pagination slug="/blog" pageNumber={pageNumber} lastPage={lastPage} />
      )}
    </section>
  )
}

export default Blog
