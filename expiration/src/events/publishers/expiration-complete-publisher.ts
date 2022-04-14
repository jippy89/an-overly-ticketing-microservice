import { Subjects, ExpirationCompleteEvent, Publisher } from "@jiptickets/common";

export class ExpirationCompletePublisher extends Publisher
  <ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}