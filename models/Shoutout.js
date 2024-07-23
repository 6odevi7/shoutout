import mongoose from 'mongoose';

const ShoutoutSchema = new mongoose.Schema({
  content: { type: String, required: true },
  // Add other fields as needed
}, { timestamps: true });

export default mongoose.models.Shoutout || mongoose.model('Shoutout', ShoutoutSchema);
