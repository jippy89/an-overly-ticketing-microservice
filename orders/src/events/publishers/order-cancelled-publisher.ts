import { Publisher, OrderCancelledEvent, Subjects } from "@jiptickets/common";

export class OrderCancelledublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}