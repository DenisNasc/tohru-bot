import mongoose from 'mongoose'

const config = { useNewUrlParser: true, useUnifiedTopology: true }

const initializeMongoose = async (url: string) => {
  try {
    const { connection } = await mongoose.connect(url, config)
    return connection
  } catch (error) {
    console.log(error.message)
  }
}

export default initializeMongoose
