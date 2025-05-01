import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './utils/connectDB.js';

// Make sure your .env has something like:
//   PORT=5000
//   BASE_URL=http://localhost
//   MONGO_URI=mongodb://localhost:27017/space-game

const PORT    = process.env.PORT    || 5000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

async function startServer() {
  try {
    // 1) connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected');

    // 2) then start express
    app.listen(PORT, () => {
      console.log(`🚀 Server running at ${BASE_URL}:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
