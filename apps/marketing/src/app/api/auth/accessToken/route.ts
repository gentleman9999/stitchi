import { getAccessToken } from '@auth0/nextjs-auth0'

export const GET = async (request: Request) => {
  try {
    const { accessToken } = await getAccessToken()

    return new Response(JSON.stringify({ accessToken }), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ accessToken: null }), {
      status: 200,
    })
  }
}
