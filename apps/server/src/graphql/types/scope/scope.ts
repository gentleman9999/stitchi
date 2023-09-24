export * from './index'
import { enumType, objectType } from 'nexus'

export const ScopeResource = enumType({
  name: 'ScopeResource',
  members: [
    'DesignProof',
    'DesignProduct',
    'DesignRequest',
    'DesignRequestRevisionRequest',
    'Order',
    'Organization',
    'Integration',
    'Membership',
  ],
})

export const ScopeAction = enumType({
  name: 'ScopeAction',
  members: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
})

export const Scope = objectType({
  name: 'Scope',
  definition(t) {
    t.nonNull.field('resource', { type: 'ScopeResource' })
    t.nonNull.field('action', { type: 'ScopeAction' })
  },
})
