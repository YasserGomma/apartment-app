import express from 'express';
import {
  getApartments,
  getProjects,
  getApartmentById,
  addApartment
} from '../controllers/apartmentController';

const router = express.Router();

router.get('/', getApartments);
router.get('/projects', getProjects);
router.get('/:id', getApartmentById);
router.post('/', addApartment);

export default router;
