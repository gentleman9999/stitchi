import { NexusGenObjects } from '../generated/nexus'
import { User } from '../../services/user/serializer'

export const userToGraphql = (user: User): NexusGenObjects['User'] => {
  return {
    id: user.id,

    email: user.email,
    emailVerified: user.emailVerified,
    familyName: user.familyName,
    givenName: user.givenName,
    lastLogin: user.lastLogin,
    name: user.name,
    loginsCount: user.loginsCount,
    nickname: user.nickname,
    phoneNumber: user.phoneNumber,
    phoneVerified: user.phoneVerified,
    picture: user.picture,
    username: user.username,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}
