import { routes } from '.'
import {
  NextPageContext,
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { track } from './analytics'

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

const makeApi = ({
  ctx,
}: {
  ctx?: Context
} = {}) => {
  const fetch = makeFetch(ctx)

  return {
    formResponse: {
      create: async (args: FormResponseCreateBody) => {
        track.contactFormSubmitted(args)

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
  }
}

export default makeApi
