import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'
import getOrThrow from '@utils/get-or-throw'

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: getOrThrow(
            process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI,
            'NEXT_PUBLIC_STITCHI_GRAPHQL_URI',
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
