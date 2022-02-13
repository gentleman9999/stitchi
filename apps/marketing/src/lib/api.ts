import { routes } from '.'

const makeApi = () => {
  return {
    formResponse: {
      create: async (args: {}) => {
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
