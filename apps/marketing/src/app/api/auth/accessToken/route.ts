import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
} from '@auth0/nextjs-auth0'

export const GET = async (request: Request) => {
  try {
    const { accessToken } = await getAccessToken()

    return new Response(JSON.stringify({ accessToken }), {
      status: 200,
    })
  } catch (error) {
    if (error instanceof AccessTokenError) {
      if (
        [
          AccessTokenErrorCode.EXPIRED_ACCESS_TOKEN,
          AccessTokenErrorCode.FAILED_REFRESH_GRANT,
          AccessTokenErrorCode.INSUFFICIENT_SCOPE,
        ].includes(error.code as AccessTokenErrorCode)
      ) {
        // We have an invalid access token, we should log the user out
        return new Response(JSON.stringify({ accessToken: null }), {
          status: 402,
        })
      }
    }

    return new Response(JSON.stringify({ accessToken: null }), {
      status: 200,
    })
  }
}
