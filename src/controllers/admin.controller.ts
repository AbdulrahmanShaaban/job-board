import { Request, Response } from 'express';
import User from '../models/User';
import Job from '../models/Job';
import Application from '../models/Application';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments({ role: 'applicant' });
    const totalCompanies = await User.countDocuments({ role: 'company' });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.json({ totalUsers, totalCompanies, totalJobs, totalApplications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPendingCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await User.find({ role: 'company', isApproved: false }).select('-password');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const approveCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select('-password');

    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }

    res.json({ message: 'Company approved', company });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};