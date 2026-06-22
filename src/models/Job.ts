import mongoose, { Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  company: mongoose.Types.ObjectId;
  location: string;
  type: 'full-time' | 'part-time' | 'remote';
  category: string;
  salary: string;
  deadline: Date;
  isActive: boolean;
}

const jobSchema = new mongoose.Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'remote'], required: true },
  category: { type: String, required: true },
  salary: { type: String },
  deadline: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IJob>('Job', jobSchema);