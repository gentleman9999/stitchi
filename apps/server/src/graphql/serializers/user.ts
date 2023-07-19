import { User } from 'auth0'
import { NexusGenObjects } from '../generated/nexus'

export const auth0UserToGraphl = (user: User): NexusGenObjects['User'] => {
  if (!user.user_id) throw new Error('User does not have a user_id')

  return { ...user, id: user.user_id }
}
