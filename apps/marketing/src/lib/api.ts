import { routes } from '.'

interface FormResponseCreateBody {
  email: string
  first_name?: string
  last_name?: string
  company?: string
  phone?: string
  description?: string
  budget?: string
}

const makeApi = () => {
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
          throw new Error(`${response.status} ${response.statusText}`)
        }
      },
    },
  }
}

const api = makeApi()

export default api
