import mongoose from 'mongoose';

const connectDB  = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Mongoose Connect succeeded !");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default  connectDB;