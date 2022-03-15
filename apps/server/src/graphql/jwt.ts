import jwt, { GetPublicKeyOrSecret } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { getOrThrow } from '../utils'

export interface Payload {
  [key: string]: any
  iss?: string | undefined
  sub?: string | undefined
  aud?: string | string[] | undefined
  exp?: number | undefined
  nbf?: number | undefined
  iat?: number | undefined
  jti?: string | undefined
}

const AUTH0_DOMAIN = getOrThrow(process.env.AUTH0_DOMAIN, 'AUTH0_DOMAIN')

const client = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
})

const getKey: GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid, function (_, key) {
    const signingKey = key
      ? 'publicKey' in key
        ? key.publicKey
        : key.rsaPublicKey
      : undefined
    callback(null, signingKey)
  })
}

export async function verify(authHeader: string) {
  if (authHeader) {
    const bearerToken = authHeader.split(' ')

    const result = await new Promise<{
      error?: jwt.VerifyErrors
      decoded?: Payload
    }>(resolve => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `https://${AUTH0_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        (error, decoded) => {
          if (error) {
            resolve({ error })
          }
          if (decoded) {
            resolve({ decoded: decoded as Payload })
          }
        },
      )
    })

    if (result.error) {
      console.error(result.error.message, { context: { error: result.error } })
      throw new Error(result.error.message)
    }

    return result.decoded
  }

  throw new Error('No token provided')
}
