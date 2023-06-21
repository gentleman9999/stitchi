import { User } from 'auth0'
import { NexusGenObjects } from '../generated/nexus'

export const auth0UserToGraphl = (user: User): NexusGenObjects['User'] => {
  return { ...user, id: user.user_id }
}
