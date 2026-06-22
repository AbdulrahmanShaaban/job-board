import { Router } from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs
} from '../controllers/job.controller';
import { protect } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

const router = Router();

router.get('/', getAllJobs);
router.get('/my-jobs', protect, authorizeRoles('company'), getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, authorizeRoles('company'), createJob);
router.put('/:id', protect, authorizeRoles('company'), updateJob);
router.delete('/:id', protect, authorizeRoles('company', 'admin'), deleteJob);

export default router;