import { extendType } from 'nexus'
import { NexusGenObjects, NexusGenEnums } from '../../generated/nexus'

const membershipHasRole = (
  roles: NexusGenEnums['MembershipRole'][],
  membership: NexusGenObjects['Membership'],
): boolean => (membership.role ? roles.includes(membership.role) : false)

export const ScopeExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.nonNull.list.nonNull.field('scopes', {
      type: 'Scope',
      resolve(membership) {
        if (!membership.role) {
          return []
        }

        let scopes: NexusGenObjects['Scope'][] = []

        if (membershipHasRole(['STITCHI_DESIGNER'], membership)) {
          scopes.push(
            ...([
              {
                resource: 'DesignProof',
                action: 'CREATE',
              },
              {
                resource: 'DesignProof',
                action: 'READ',
              },
              {
                resource: 'DesignProof',
                action: 'UPDATE',
              },
              {
                resource: 'DesignProof',
                action: 'DELETE',
              },
            ] as const),
          )
        }

        return scopes
      },
    })
  },
})
