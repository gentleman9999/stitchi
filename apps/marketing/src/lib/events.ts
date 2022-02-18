import getOrThrow from '@utils/get-or-throw'

export const GTM_ID = getOrThrow(
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  'NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID',
)

const events = {
  pageview: (url: string) => {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    })
  },
}

export default events
