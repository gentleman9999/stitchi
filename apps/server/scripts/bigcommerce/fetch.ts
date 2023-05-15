import fetch, { RequestInit } from 'node-fetch'

// Set up the BigCommerce API details
const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

const bigCommerceFetch = async (
  url: string,
  config?: RequestInit,
): Promise<any> => {
  return await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog${url}`,
    {
      ...config,
      headers: {
        ...config?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    },
  )
}

export default bigCommerceFetch
