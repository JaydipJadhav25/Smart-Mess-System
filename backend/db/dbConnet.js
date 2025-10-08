import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Function to establish a database connection
export const dbConnect = async () => {

  try {
    // Connect to the MongoDB database
    const connectiondb = await mongoose.connect(process.env.DBURL, {
      // useNewUrlParser: true, // Ensures parsing MongoDB connection string
      //useUnifiedTopology: true, // Enables the new connection management engine
    });

    // Log connection details and success message
    // console.log("Connection Details:", connectiondb.connection.host);
    console.log("Database Connected Successfully...🤖");

  } catch (error) {
    // Log the error details
    console.error("Database Connection Error:", error.message);

    // Exit the process in case of connection failure
    process.exit(1); // Use 1 to indicate an error occurred
  }
};