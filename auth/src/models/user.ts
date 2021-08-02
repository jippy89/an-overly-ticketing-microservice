import mongoose from 'mongoose'
import {Password} from '../services/password'

// Interface that describes user's attributes
interface UserAttrs {
  email: string,
  password: string
}

// Interface that describes `User` model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// Interface that descibes the `User` document
interface UserDoc extends mongoose.Document {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema<UserDoc>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    versionKey: false, // Erase the `doc.__v`
    transform(doc, ret) {
      delete ret.password

      ret.id = ret._id
      delete ret._id
    }
  }
})

// Hooks
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.hash(this.get('password'))
    this.set('password', hashed)
  }

  done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }