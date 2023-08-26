import { extendType } from 'nexus'
import { NexusGenObjects, NexusGenEnums } from '../../generated/nexus'

const scopeMap: Record<
  NexusGenEnums['MembershipRole'],
  Record<NexusGenEnums['ScopeResource'], NexusGenEnums['ScopeAction'][]>
> = {
  OWNER: {
    Order: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignProof: ['READ'],
    DesignProduct: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignRequest: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignRequestRevisionRequest: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    Integration: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    Membership: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
  },
  STITCHI_DESIGNER: {
    Order: [],
    DesignProof: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignProduct: [],
    DesignRequest: ['READ'],
    DesignRequestRevisionRequest: ['READ'],
    Integration: [],
    Membership: [],
  },
  STITCHI_ADMIN: {
    Order: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignProof: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignProduct: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignRequest: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    DesignRequestRevisionRequest: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    Integration: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    Membership: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
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
