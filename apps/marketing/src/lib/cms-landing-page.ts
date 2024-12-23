import { format } from 'date-fns'
import routes from './routes'

type Category = 'tradeshow' | 'insight' | 'industry' | 'conference'

export const getHref = (landingPage: { slug: string; category: string }) => {
  switch (landingPage.category as Category) {
    case 'conference':
      return routes.internal.conferences.show.href({
        conferenceSlug: landingPage.slug,
      })
    case 'industry':
      return routes.internal.industries.show.href(landingPage.slug)
    case 'insight':
      return routes.internal.insights.show.href({
        insightSlug: landingPage.slug,
      })
    case 'tradeshow':
      return routes.internal.tradeshows.show.href({
        tradeshowSlug: landingPage.slug,
      })
    default:
      console.error('Unknown landing page category', landingPage.category)
      return ''
  }
}

export const formatTradeshowDate = (
  startDate: string | null,
  endDate: string | null,
) => {
  let dateString

  if (startDate) {
    if (endDate) {
      dateString = `${formatDate(startDate)} to ${formatDate(endDate)}`
    } else {
      dateString = `${formatDate(startDate)}`
    }
  }

  return dateString
}

const formatDate = (date: string) => {
  return format(new Date(date), 'MMMM d, yyyy')
}
