import { handleAuth, handleLogin, LoginOptions } from '@auth0/nextjs-auth0'
import getOrThrow from '@lib/utils/get-or-throw'
import { NextApiRequest, NextApiResponse } from 'next'

async function handleAction(
  req: NextApiRequest,
  res: NextApiResponse,
  params: LoginOptions,
) {
  try {
    await handleLogin(req, res, params)
  } catch (e) {
    console.error(e)
    res.status(400).json({ message: e })
  }
}

const audience = getOrThrow(
  process.env.NEXT_PUBLIC_STITCHI_SERVER_URI,
  'NEXT_PUBLIC_STITCHI_SERVER_URI',
)

const defaultAuthorizationParams = {
  audience,
  scope: 'openid profile email',
}

export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    return handleAction(req, res, {
      authorizationParams: {
        ...defaultAuthorizationParams,
      },
    })
  },
  async signup(req: NextApiRequest, res: NextApiResponse) {
    return handleAction(req, res, {
      authorizationParams: {
        screen_hint: 'signup',
        ...defaultAuthorizationParams,
      },
    })
  },
})
