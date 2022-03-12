import { enumType } from 'nexus'

export const GlobalRole = enumType({
  name: 'GlobalRole',
  members: {
    // Stitchi Employee
    SUPERADMIN: 'SUPERADMIN',
    // Stitchi Customer
    CUSTOMER: 'CUSTOMER',
  },
})
