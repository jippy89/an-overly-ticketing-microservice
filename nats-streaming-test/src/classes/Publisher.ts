import { Stan } from "node-nats-streaming";
import { Event } from "../events/event";
import { Subjects } from "../events/subjects";

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject']
  constructor(private client: Stan) {
  }

  publish (data: T['data']) {
    const stringifiedData = JSON.stringify(data)
    return new Promise<void>((resolve, reject) => {
      this.client.publish(this.subject, stringifiedData, (err) => {
        if (err) {
          return reject(err)
        }
        
        console.log('Event published to', this.subject, data)
        return resolve()
      })
    })
  }
}