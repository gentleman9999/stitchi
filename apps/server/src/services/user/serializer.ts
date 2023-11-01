import { GetUsers200ResponseOneOfInner } from 'auth0'

export interface User {
  id: string
  email: string
  emailVerified: boolean
  username: string
  phoneNumber: string
  phoneVerified: boolean
  picture: string
  name: string
  nickname: string
  lastIp: string
  lastLogin: string
  loginsCount: number
  blocked: boolean
  givenName: string
  familyName: string

  createdAt: string
  updatedAt: string
}

export const makeUser = (data: GetUsers200ResponseOneOfInner): User => {
  return {
    id: data.user_id,
    email: data.email,
    emailVerified: data.email_verified,
    username: data.username,
    phoneNumber: data.phone_number,
    phoneVerified: data.phone_verified,
    picture: data.picture,
    name: data.name,
    nickname: data.nickname,
    lastIp: data.last_ip,
    loginsCount: data.logins_count,
    lastLogin: data.last_login as string,
    blocked: data.blocked,
    givenName: data.given_name,
    familyName: data.family_name,

    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string,
  }
}
