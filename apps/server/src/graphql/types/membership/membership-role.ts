import { enumType } from 'nexus'

export const MembershipRole = enumType({
  name: 'MembershipRole',
  members: {
    OWNER: 'OWNER',
    STITCHI_DESIGNER: 'STITCHI_DESIGNER',
    STITCHI_ADMIN: 'STITCHI_ADMIN',
  },
})
