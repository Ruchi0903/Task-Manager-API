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

    // Only exit if NOT running tests
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      throw err;  // Let Jest catch the error and fail the test gracefully
    }
  }
}