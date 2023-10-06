import { NexusGenEnums, NexusGenObjects } from './generated/nexus'

type Role = NexusGenEnums['MembershipRole']
type Scope = NexusGenObjects['Scope']

type ScopeResource = NexusGenEnums['ScopeResource']
type ScopeAction = NexusGenEnums['ScopeAction']
type ScopeModifier = NexusGenEnums['ScopeModifier']

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
    DesignProduct: [
      ['CREATE'],
      ['READ', 'OWN'],
      ['UPDATE', 'OWN'],
      ['DELETE', 'OWN'],
    ],
    DesignRequest: [
      ['CREATE'],
      ['READ', 'OWN'],
      ['UPDATE', 'OWN'],
      ['DELETE', 'OWN'],
    ],
    DesignRequestRevisionRequest: [
      ['CREATE'],
      ['READ', 'OWN'],
      ['UPDATE', 'OWN'],
      ['DELETE', 'OWN'],
    ],
    Integration: [['CREATE'], ['READ'], ['UPDATE'], ['DELETE']],
    Membership: [
      ['CREATE'],
      ['READ', 'OWN'],
      ['UPDATE', 'OWN'],
      ['DELETE', 'OWN'],
    ],
    Organization: [
      ['CREATE'],
      ['READ', 'OWN'],
      ['UPDATE', 'OWN'],
      ['DELETE', 'OWN'],
    ],
  },
  STITCHI_DESIGNER: {
    Order: [],
    DesignProof: [
      ['CREATE'],
      ['READ', 'OWN'],
      ['UPDATE', 'OWN'],
      ['DELETE', 'OWN'],
    ],
    DesignProduct: [],
    DesignRequest: [['READ', 'ALL']],
    DesignRequestRevisionRequest: [['READ', 'OWN']],
    Integration: [],
    Membership: [],
    Organization: [],
  },
  STITCHI_ADMIN: {
    Order: [['CREATE'], ['READ', 'ALL'], ['UPDATE', 'ALL'], ['DELETE', 'ALL']],
    DesignProof: [
      ['CREATE'],
      ['READ', 'ALL'],
      ['UPDATE', 'ALL'],
      ['DELETE', 'ALL'],
    ],
    DesignProduct: [
      ['CREATE'],
      ['READ', 'ALL'],
      ['UPDATE', 'ALL'],
      ['DELETE', 'ALL'],
    ],
    DesignRequest: [
      ['CREATE'],
      ['READ', 'ALL'],
      ['UPDATE', 'ALL'],
      ['DELETE', 'ALL'],
    ],
    DesignRequestRevisionRequest: [
      ['CREATE'],
      ['READ', 'ALL'],
      ['UPDATE', 'ALL'],
      ['DELETE', 'ALL'],
    ],
    Integration: [
      ['CREATE'],
      ['READ', 'ALL'],
      ['UPDATE', 'ALL'],
      ['DELETE', 'ALL'],
    ],
    Membership: [
      ['CREATE'],
      ['READ', 'ALL'],
      ['UPDATE', 'ALL'],
      ['DELETE', 'ALL'],
    ],
    Organization: [
      ['CREATE'],
      ['READ', 'ALL'],
      ['UPDATE', 'ALL'],
      ['DELETE', 'ALL'],
    ],
  },
}

interface AuthorizerParams {
  modifier: ScopeModifier
}

export type AuthorizerFn = (
  action: ScopeAction,
  resource: ScopeResource,
  params: AuthorizerParams,
) => Scope | null

// ScopeModifier can be undefined if it does not make sense in Scope
// i.e. CREATE (OWN) does not make sense because when CREATE-ing,
// the resulting resource will be your OWN
type PermissionMap = {
  // Note: I'd rather these be their enum type, but type unions
  // cannot index a record generically
  [resource: string]: { [action: string]: Scope }
}

export function makeAuthorizer(role: Role | undefined): AuthorizerFn {
  if (!role) {
    // If there is no role, assume no access
    return () => {
      return null
    }
  }

  const permissionMap: PermissionMap = {}

  for (const [resource, scopePairs] of Object.entries(scopeMap[role])) {
    if (!permissionMap[resource]) {
      // If there is no configuration yet for the resource, set it up
      permissionMap[resource] = {}
    }

    for (const [action, modifier] of scopePairs) {
      if (!permissionMap[resource][action]) {
        // If we haven't seen this scope yet, assign it
        permissionMap[resource][action] = {
          resource: resource as ScopeResource,
          action,
          modifier,
        }
      } else if (modifier === 'ALL') {
        // If we've seen the scope and the new modifier is 'ALL',
        // overwrite it. If the previous is 'ALL', it's a no-op.
        permissionMap[resource][action].modifier = modifier
      }
    }
  }

  return function (
    action: ScopeAction,
    resource: ScopeResource,
    params: AuthorizerParams,
  ) {
    const permissionFound =
      resource in permissionMap && action in permissionMap[resource]

    if (!permissionFound) {
      return null
    }

    const scope = permissionMap[resource][action]

    if (params.modifier && scope.modifier) {
      // If a modifier is required AND the Permission provides a modifier
      if (params.modifier === 'ALL') {
        // If seeing ALL is required, we must be able to see ALL
        return scope.modifier === 'ALL' ? scope : null
      }

      if (params.modifier === 'OWN') {
        // If seeing OWN is required, we must at least be able to see OWN
        return ['ALL', 'OWN'].includes(scope.modifier) ? scope : null
      }
    }

    return scope
  }
}

export function onlyOwn(scope: Scope): boolean {
  return scope.modifier === 'OWN'
}
