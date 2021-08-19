import { Stan } from "node-nats-streaming";
import { Event } from "../events/event";
import { Subjects } from "../events/subjects";

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject']
  constructor(private client: Stan) {
  }

  publish (data: T['data']) {
    const stringifiedData = JSON.stringify(data)
    this.client.publish(this.subject, stringifiedData, () => {
      console.log('Event published', data)
    })
  }
}