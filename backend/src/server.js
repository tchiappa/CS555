import app from "./app.js";
import connectDB from "./utils/connectDB.js";

const port = process.env.port;
const baseURL = process.env.baseURL;

const server = app.listen(port, () => {
  connectDB();
  console.log(`server running on port ${baseURL}${port}`);
});
