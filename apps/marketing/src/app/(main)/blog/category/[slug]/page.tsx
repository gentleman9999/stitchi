import { type Metadata } from 'next'
import Link from 'next/link'
import { BlogClient } from 'seobot'
import ArticleCard from '../../components/ArticleCard'
import Pagination from '../../components/Pagination'
import getOrThrow from '@lib/utils/get-or-throw'
import { SITE_URL } from '@lib/constants'

async function getPosts(slug: string, page: number) {
  const key = getOrThrow(process.env.SEOBOT_API_KEY, 'SEOBOT_API_KEY')

  const client = new BlogClient(key)
  return client.getCategoryArticles(slug, page, 10)
}

function deslugify(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
}

const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const title = deslugify(slug)
  const description = `Articles in the category ${title}`

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      // images: [],
      url: `${SITE_URL}/blog/category/${slug}`,
    },
    twitter: {
      title,
      description,
      // card: 'summary_large_image',
      // images: [],
    },
  }
}

const Category = async ({
  params: { slug },
  searchParams: { page },
}: {
  params: { slug: string }
  searchParams: { page: number }
}) => {
  const pageNumber = Math.max((page || 0) - 1, 0)
  const { total, articles } = await getPosts(slug, pageNumber)
  const posts = articles || []
  const lastPage = Math.ceil(total / 10)

  return (
    <section className="max-w-3xl my-8 lg:mt-10 mx-auto px-4 md:px-8 ">
      <div className="flex flex-wrap items-center gap-2 w-full text-sm mb-4">
        <a href="/" className="text-orange-500">
          Home
        </a>
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
        <Link href="/blog/" className="text-orange-500">
          Blog
        </Link>
      </div>
      <h1 className="text-4xl my-4 font-black">Category: {slug}</h1>
      <ul>
        {posts.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
      {lastPage > 1 && (
        <Pagination
          slug={`/blog/category/${slug}`}
          pageNumber={pageNumber}
          lastPage={lastPage}
        />
      )}
    </section>
  )
}

export { generateMetadata }
export default Category
