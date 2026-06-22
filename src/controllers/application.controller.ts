import { Request, Response } from 'express';
import Application from '../models/Application';
import Job from '../models/Job';

export const applyToJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    const existing = await Application.findOne({ job: req.params.jobId, applicant: req.user?._id });
    if (existing) {
      res.status(400).json({ message: 'Already applied to this job' });
      return;
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user?._id,
      coverLetter: req.body.coverLetter
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await Application.find({ applicant: req.user?._id })
      .populate('job', 'title location type company')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getJobApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (job.company.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    const job = await Job.findById(application.job);
    if (job?.company.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    application.status = req.body.status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};