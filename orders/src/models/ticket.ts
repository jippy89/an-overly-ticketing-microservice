import mongoose from 'mongoose'
import { Order, OrderStatus } from './order'

/**
 * This is the first code duplication that we have ever done for "Ticket" model.
 * So you might think can we put this in our `common` library?
 * The answer is NO.
 * A model has to be dedicated to its service, in this case "Order" model might only care about "Ticket"'s title and price.
 * 
 * From my perspective:
 * This can be excluded ofc, however it might be useless as if we kept the "userId" property and not using it.
 * This can save a little bit of memory size, so it will cost less.
 */

interface TicketAttrs {
  id: string
  title: string
  price: number
}

export interface TicketDoc extends mongoose.Document {
  title: string
  price: number
  isReserved(): Promise<boolean>
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build (attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema<TicketDoc>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  // Tutor doing it like this, but maybe you could use spread operator(?)
  // Idk if it will be save in production thought.
  // return new Ticket({
  //   ...attrs,
  //   _id: attrs.id,
  // })
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price
  })
}
ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this.id,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  })
  return !!existingOrder
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }