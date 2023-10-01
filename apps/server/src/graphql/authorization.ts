import { NexusGenEnums } from "./generated/nexus"

type Role = NexusGenEnums['MembershipRole']

type ScopeResource = NexusGenEnums['ScopeResource']
type ScopeAction = NexusGenEnums['ScopeAction']
type ScopeModifier = NexusGenEnums['ScopeModifier']

interface AuthorizerParams {
  modifier: ScopeModifier
}

type AuthorizerFn = (
  action: ScopeAction,
  resource: ScopeResource,
  params: AuthorizerParams,
) => boolean

// ScopeModifier can be undefined if it does not make sense in Scope
// i.e. CREATE (OWN) does not make sense because when CREATE-ing,
// the resulting resource will be your OWN
type PermissionMap = {
    // Note: I'd rather these be their enum type, but type unions
    // cannot index a record generically
    [resource: string]: { [action: string]: ScopeModifier | undefined}
}

export function makeAuthorizer(role: Role): AuthorizerFn {
  const permissionMap: PermissionMap = {}

  return function(action: ScopeAction, resource: ScopeResource, params: AuthorizerParams) {
    const permissionFound = resource in permissionMap && action in permissionMap[resource]

    if (!permissionFound) {
      return false
    }

    const permissionModifier = permissionMap[resource][action]

    if (params.modifier && permissionModifier) {
      // If a modifier is required AND the Permission provides a modifier
      if (params.modifier === 'ALL') {
        // If seeing ALL is required, we must be able to see ALL
        return permissionModifier === 'ALL'
      }

      if (params.modifier === 'OWN') {
        // If seeing OWN is required, we must at least be able to see OWN
        return ['ALL', 'OWN'].includes(permissionModifier)
      }
    }

    return true
  }
}
