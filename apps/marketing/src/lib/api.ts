import { routes } from '.'
import { object, SchemaOf, number, array, string } from 'yup'
import { ProductListResponse } from 'pages/api/catalog/products'
import {
  NextPageContext,
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next'
import getOrThrow from '@utils/get-or-throw'
import makeAbsoluteUrl from '@utils/get-absolute-url'

const listResponseSchema: SchemaOf<ProductListResponse> = object({
  _metadata: object({
    page: number().required(),
    perPage: number().required(),
    pageCount: number().required(),
    totalCount: number().required(),
  }),
  records: array().of(
    object({
      id: string().required(),
      url: string(),
      name: string().required(),
      style: string(),
      image: object({
        url: string(),
        label: string(),
      }),
    }),
  ),
})

type Context =
  | NextPageContext
  | GetServerSidePropsContext
  | GetStaticPathsContext
  | GetStaticPropsContext

const makeFetch =
  (ctx?: Context) => async (url: string, init?: RequestInit) => {
    return fetch(ctx ? makeAbsoluteUrl(url) : url, init)
  }

interface FormResponseCreateBody {
  email: string
  first_name?: string
  last_name?: string
  company?: string
  phone?: string
  description?: string
  budget?: string
}

interface MailListSubscriptionCreateBody {
  email: string
}

const makeApi = ({
  ctx,
}: {
  ctx?: Context
} = {}) => {
  const fetch = makeFetch(ctx)

  return {
    formResponse: {
      create: async (args: FormResponseCreateBody) => {
        const response = await fetch(routes.api.formResponse.create.href(), {
          method: 'POST',
          body: JSON.stringify(args),
        })

        if (response.ok) {
          return response.json()
        } else {
          console.error('Failed to create a form response', {
            context: { response },
          })
          throw new Error(`${response.status} ${response.statusText}`)
        }
      },
    },
    mailingListSubscription: {
      create: async (args: MailListSubscriptionCreateBody) => {
        const response = await fetch(
          routes.api.mailingListSubscription.create.href(),
          {
            method: 'POST',
            body: JSON.stringify(args),
          },
        )

        if (response.ok) {
          return response.json()
        } else {
          console.error('Failed to create a mailing list subscription', {
            context: { response },
          })
          throw new Error(`${response.status} ${response.statusText}`)
        }
      },
    },
    product: {
      list: async () => {
        const response = await fetch(routes.api.product.list.href(), {
          method: 'GET',
        })

        if (response.ok) {
          const validatedResponse = await listResponseSchema.validate(
            await response.json(),
          )
          return validatedResponse
        } else {
          console.error('Failed to list products', {
            context: { response },
          })
          throw new Error(`${response.status} ${response.statusText}`)
        }
      },
    },
  }
}

export default makeApi
