import { Router } from 'express';
import {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus
} from '../controllers/application.controller';
import { protect } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

const router = Router();

router.post('/:jobId', protect, authorizeRoles('applicant'), applyToJob);
router.get('/my-apps', protect, authorizeRoles('applicant'), getMyApplications);
router.get('/job/:jobId', protect, authorizeRoles('company'), getJobApplications);
router.put('/:id/status', protect, authorizeRoles('company'), updateApplicationStatus);

export default router;