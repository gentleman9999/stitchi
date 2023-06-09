import { inputObjectType } from 'nexus'

export const StringFilterInput = inputObjectType({
  name: 'StringFilterInput',
  definition(t) {
    t.string('contains')
    t.string('equals')
    t.string('startsWith')
    t.string('endsWith')
    t.string('gt')
    t.string('gte')
    t.string('lt')
    t.string('lte')
    t.list.nonNull.string('in')
    t.list.nonNull.string('notIn')
  },
})
