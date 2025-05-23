import { Request, Response } from 'express';
import Apartment from '../models/apartmentModel';

/**
 * @route   GET /api/apartments
 * @desc    Fetch all apartments with optional filters (search, projects)
 * @access  Public
 */
export const getApartments = async (req: Request, res: Response) => {
  try {
    const { search, projects } = req.query;
    let query: any = {};

    if (search) {
      query.$or = [
        { unitName: { $regex: search, $options: 'i' } },
        { unitNumber: { $regex: search, $options: 'i' } },
        { project: { $regex: search, $options: 'i' } },
      ];
    }

    if (projects) {
      const projectArray = (projects as string).split(',');
      query.project = { $in: projectArray };
    }

    const apartments = await Apartment.find(query);
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @route   POST /api/apartments
 * @desc    Add a new apartment to the database
 * @access  Public
 * @body    { unitName, unitNumber, project, price, bedrooms, bathrooms, area, imageUrl, description }
 */
export const addApartment = async (req: Request, res: Response) => {
  try {
    const apartment = new Apartment(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @route   GET /api/apartments/:id
 * @desc    Fetch a single apartment by its ID
 * @access  Public
 */
export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @route   GET /api/apartments/projects
 * @desc    Get all unique project names for filtering
 * @access  Public
 */
export const getProjects = async (req: Request, res: Response) => {
  try {
    console.log('[GET] /projects hit');
    const projects = await Apartment.distinct('project');
    console.log('[DB] Projects found:', projects);
    res.status(200).json(projects);
  } catch (error: any) {
    console.error('[ERROR] getProjects:', error);
    res.status(500).json({ message: 'Server error', error: error.stack });
  }
};
