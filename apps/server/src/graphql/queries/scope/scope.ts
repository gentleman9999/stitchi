import { extendType } from 'nexus'
import { scopeMap } from '../../authorization'
import { NexusGenObjects, NexusGenEnums } from '../../generated/nexus'

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
