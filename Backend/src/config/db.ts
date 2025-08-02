import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(`MongoDB connected in: ${url}`)
    } catch (error) {
        console.log('Error connecting to the DB')
        process.exit(1)
    }
}