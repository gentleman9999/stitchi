import { PubSub } from 'graphql-subscriptions'

type EventPayloadMap = {
  DESIGN_REQUEST_HISTORY_ITEM_ADDED: {
    designRequestId: string
  }
}

class PubSubClient {
  private pubsub: PubSub

  constructor() {
    this.pubsub = new PubSub()
  }

  publish<EventName extends keyof EventPayloadMap>(
    eventName: EventName,
    payload: EventPayloadMap[EventName],
  ): void {
    this.pubsub.publish(eventName, payload)
  }

  asyncIterator<EventName extends keyof EventPayloadMap>(
    eventName: EventName,
  ): AsyncIterator<EventPayloadMap[EventName]> {
    return this.pubsub.asyncIterator([eventName])
  }
}

export default PubSubClient
