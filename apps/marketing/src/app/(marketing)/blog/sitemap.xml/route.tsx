import { SITE_URL } from '@lib/constants'
import getOrThrow from '@lib/utils/get-or-throw'

async function getSitemap() {
  const key = getOrThrow(process.env.SEOBOT_API_KEY, 'SEOBOT_API_KEY')

  try {
    const res = await fetch(`https://app.seobotai.com/api/sitemap?key=${key}`, {
      cache: 'no-store',
    })
    const result = await res.json()
    return result?.data
  } catch {
    return { articles: [], categories: [], tags: [] }
  }
}

function toSitemapRecord(loc: string, updatedAt: string) {
  return `<url><loc>${new URL(
    loc,
    SITE_URL,
  ).toString()}</loc><lastmod>${updatedAt}</lastmod></url>`
}

type SitemapItem = { slug: string; lastmod: string }

async function generateSiteMap() {
  const blogSitemap = await getSitemap()
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${SITE_URL}/blog</loc>
    </url>
     ${blogSitemap.articles.map((i: SitemapItem) =>
       toSitemapRecord(`/blog/${i.slug}`, i.lastmod),
     )}
     ${blogSitemap.categories.map((i: SitemapItem) =>
       toSitemapRecord(`/blog/category/${i.slug}`, i.lastmod),
     )}
     ${blogSitemap.tags.map((i: SitemapItem) =>
       toSitemapRecord(`/blog/tag/${i.slug}`, i.lastmod),
     )}
   </urlset>
 `
}

const GET = async () => {
  const body = await generateSiteMap()

  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  })
}

export { GET }
