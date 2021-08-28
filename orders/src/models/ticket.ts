import mongoose from 'mongoose'

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
  title: string
  price: number
}

export interface TicketDoc extends mongoose.Document {
  title: string
  price: number
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
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }