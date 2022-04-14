import { Publisher, OrderCancelledEvent, Subjects } from "@jiptickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}