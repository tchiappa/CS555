import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI not defined in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);

    console.log("✅ MongoDB connection successful");
  } catch (e) {
    console.error("❌ MongoDB connection failed", e);
    process.exit(1);
  }
}

export default connectDB;
