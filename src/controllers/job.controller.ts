import { Request, Response } from 'express';
import Job from '../models/Job';

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.create({ ...req.body, company: req.user?._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, location, type } = req.query;

    const filter: any = { isActive: true };

    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const jobs = await Job.find(filter).populate('company', 'name companyName').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id).populate('company', 'name companyName');
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (job.company.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (job.company.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find({ company: req.user?._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};