import { extendType } from 'nexus'
import { NexusGenObjects, NexusGenEnums } from '../../generated/nexus'

export const scopeMap: Record<
  NexusGenEnums['MembershipRole'],
  Record<
    NexusGenEnums['ScopeResource'],
    [NexusGenEnums['ScopeAction'], NexusGenEnums['ScopeModifier']?][]
  >
> = {
  OWNER: {
    Order: [['CREATE'], ['READ', 'OWN'], ['UPDATE', 'OWN'], ['DELETE', 'OWN']],
    DesignProof: [['READ', 'OWN']],
    DesignProduct: [['CREATE'], ['READ', 'OWN'], ['UPDATE', 'OWN'], ['DELETE', 'OWN']],
    DesignRequest: [['CREATE'], ['READ', 'OWN'], ['UPDATE', 'OWN'], ['DELETE', 'OWN']],
    DesignRequestRevisionRequest: [['CREATE'], ['READ', 'OWN'], ['UPDATE', 'OWN'], ['DELETE', 'OWN']],
    Integration: [['CREATE'], ['READ'], ['UPDATE'], ['DELETE']],
    Membership: [['CREATE'], ['READ', 'OWN'], ['UPDATE', 'OWN'], ['DELETE', 'OWN']],
    Organization: [['CREATE'], ['READ', 'OWN'], ['UPDATE', 'OWN'], ['DELETE', 'OWN']],
  },
  STITCHI_DESIGNER: {
    Order: [],
    DesignProof: [['CREATE'], ['READ', 'OWN'], ['UPDATE', 'OWN'], ['DELETE', 'OWN']],
    DesignProduct: [],
    DesignRequest: [['READ', 'ALL']],
    DesignRequestRevisionRequest: [['READ', 'OWN']],
    Integration: [],
    Membership: [],
    Organization: [],
  },
  STITCHI_ADMIN: {
    Order: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    DesignProof: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    DesignProduct: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    DesignRequest: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    DesignRequestRevisionRequest: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    Integration: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    Membership: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    Organization: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
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
          ([resource, actionModifierPairs]) => {
            actionModifierPairs.forEach(([action, modifier]) => {
              scopes.push({
                resource: resource as NexusGenEnums['ScopeResource'],
                action,
                modifier,
              })
            })
          },
        )

        return scopes
      },
    })
  },
})
