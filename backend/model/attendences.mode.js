import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  ID: String,
  Name: String,
  DateTime: String,
});

const AttendanceDataSchema = new mongoose.Schema({
  date: { type: String, required: true },
  students: [StudentSchema],
});

// ✅ Important: specify collection name explicitly to match MongoDB
export const Attendence =  mongoose.model("AttendanceData", AttendanceDataSchema, "AttendanceData");
