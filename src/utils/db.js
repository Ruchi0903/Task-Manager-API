import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 MongoDB connected');
  } catch (err) {
    console.error('🔴 MongoDB connection error:', err.message);
    process.exit(1);
  }
};
