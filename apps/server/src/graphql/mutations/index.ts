import { mutationType } from 'nexus'

export { userBootstrap } from './user'
export { subscriberCreate, SubscriberCreateInput } from './newsletter'
export {
  QuoteGenerateInput,
  QuoteGeneratePayload,
  quoteGenerate,
  QuoteGeneratePrintLocationInput,
} from './quote'

export const Mutation = mutationType({
  definition: () => {},
})
