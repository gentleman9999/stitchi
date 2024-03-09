import env from '../../environment'
import * as yup from 'yup'
import { ResponseTuple } from './types'

interface MakeClientConfig {
  storeHash: string
  accessToken: string
}

const makeClient = (
  { accessToken, storeHash }: MakeClientConfig = {
    accessToken: env.BIGC_ACCESS_TOKEN,
    storeHash: env.BIGC_STORE_HASH,
  },
) => {
  const handleFetch = async (
    url: string,
    init?: RequestInit,
  ): Promise<Response> => {
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog${url}`,
      {
        ...init,
        headers: {
          ...init?.headers,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': accessToken,
        },
      },
    )

    if (res.status === 429) {
      // We've hit the rate limit, so we need to wait a bit and try again
      const waitMs = res.headers.get('X-Rate-Limit-Time-Reset-Ms')

      if (!waitMs) {
        throw new Error('Rate limit hit, but no wait time provided')
      }

      const waitTime = parseInt(waitMs)

      console.log(`Rate limit hit, waiting ${waitTime}ms before trying again`, {
        context: {
          url,
        },
      })

      await new Promise(resolve => setTimeout(resolve, waitTime))

      return handleFetch(url, init)
    }

    return res
  }

  return {
    call: async <T>(
      url: string,
      schema: yup.Schema<T>,
      init?: RequestInit,
    ): Promise<ResponseTuple<T>> => {
      let res
      res = await handleFetch(url, init)

      let json

      try {
        json = await res.json()
      } catch (error) {
        console.error(`Error parsing BigCommerce response.`, {
          error,
          url,
          init,
        })

        return [
          {
            status: 500,
            title: 'Failed to parse response body',
          },
          null,
        ]
      }

      if (!res.ok) {
        console.error('Big commerce responses contains an error', {
          context: {
            url,
            init,
            error: json,
            json: JSON.stringify(json),
          },
        })

        return [
          {
            status: res.status,
            title: 'BigCommerce API error',
            errors: [JSON.stringify(json)],
          },
          null,
        ]
      }

      try {
        const validResponse = await schema.validate(json)

        return [null, validResponse]
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return [
            {
              status: 500,
              title: 'Failed to validate response body',
              errors: JSON.stringify(error.errors),
            },
            null,
          ]
        }

        console.error(`Error validating BigCommerce response.`, {
          error,
          url,
          init,
        })

        return [
          {
            status: 500,
            title: 'Failed to validate response body',
            errors: [JSON.stringify(error)],
          },
          null,
        ]
      }
    },
  }
}

export type BigCommerceClient = ReturnType<typeof makeClient>

export default makeClient
