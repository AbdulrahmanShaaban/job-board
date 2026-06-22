import { Router } from 'express';
import {
  getStats,
  getPendingCompanies,
  approveCompany,
  deleteJob,
  deleteUser
} from '../controllers/admin.controller';
import { protect } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

const router = Router();

router.use(protect, authorizeRoles('admin'));

router.get('/stats', getStats);
router.get('/companies/pending', getPendingCompanies);
router.put('/companies/:id/approve', approveCompany);
router.delete('/jobs/:id', deleteJob);
router.delete('/users/:id', deleteUser);

export default router;