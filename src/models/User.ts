import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'applicant' | 'company' | 'admin';
  companyName?: string;
  isApproved: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['applicant', 'company', 'admin'], default: 'applicant' },
  companyName: { type: String },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);