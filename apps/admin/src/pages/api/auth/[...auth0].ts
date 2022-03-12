import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'
import { getOrThrow } from 'utils'
export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: getOrThrow(
            process.env.GRAPHQL_API_ENDPOINT_URL,
            'GRAPHQL_API_ENDPOINT_URL',
          ),
          scope: 'openid profile email',
        },
      })
    } catch (e) {
      console.error(e)
      res.status(400).json({ message: e })
    }
  },
})
