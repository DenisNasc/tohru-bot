import mongoose, { Schema, Document } from 'mongoose'

export interface IUsers extends Document {
  discordID: string
  username: string
  memberSince?: string
  catched?: number
}

export const userSchema = new Schema({
  discordID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: false
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  catched: {
    type: Number,
    required: true,
    default: 1
  }
})

export default mongoose.model<IUsers>('users', userSchema)
