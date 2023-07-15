import { extendType } from 'nexus'
import { NexusGenObjects, NexusGenEnums } from '../../generated/nexus'

const scopeMap: Record<
  NexusGenEnums['MembershipRole'],
  Record<NexusGenEnums['ScopeResource'], NexusGenEnums['ScopeAction'][]>
> = {
  OWNER: {
    Order: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignProof: [],
    DesignRequestRevisionRequest: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    Integration: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
  },

  STITCHI_DESIGNER: {
    Order: [],
    DesignProof: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignRequestRevisionRequest: ['READ'],
    Integration: [],
  },
}

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

        Object.entries(scopeMap[membership.role]).forEach(
          ([resource, actions]) => {
            actions.forEach(action => {
              scopes.push({
                resource: resource as NexusGenEnums['ScopeResource'],
                action,
              })
            })
          },
        )

        return scopes
      },
    })
  },
})
