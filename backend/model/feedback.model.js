import mongoose from "mongoose";

// Sub-schema for individual item feedback
const itemFeedbackDetailSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, trim: true },
  positiveTags: { type: [String], default: [] },
  negativeTags: { type: [String], default: [] },
}, { _id: false });

// Main Feedback Schema
const feedbackSchema = new mongoose.Schema({
  // User field updated to store a String
  user: {
    type: String,
    required: true,
    trim: true,
  },

  meal: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default : Date.now()
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  itemFeedback: {
    type: Map,
    of: itemFeedbackDetailSchema,
  },
  positiveTags: {
    type: [String],
    default: [],
  },
  negativeTags: {
    type: [String],
    default: [],
  },
  comment: {
    type: String,
    trim: true,
  },

}, {
  timestamps: true,
});

export const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

