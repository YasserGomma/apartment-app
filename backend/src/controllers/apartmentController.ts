import { Request, Response } from 'express';
import Apartment from '../models/apartmentModel';

/**
 * @route   GET /api/apartments
 * @desc    Fetch all apartments with optional filters (search, projects) and pagination
 * @access  Public
 */
export const getApartments = async (req: Request, res: Response) => {
  try {
    const { search, projects, page = 1, limit = 6 } = req.query;
    const query: any = {};

    if (search) {
      query.$or = [
        { unitName: new RegExp(search as string, 'i') },
        { unitNumber: new RegExp(search as string, 'i') },
        { project: new RegExp(search as string, 'i') },
      ];
    }

    if (projects) {
      const projectArray = (projects as string).split(',');
      query.project = { $in: projectArray };
    }

    const total = await Apartment.countDocuments(query);
    const apartments = await Apartment.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.status(200).json({ data: apartments, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apartments', error });
  }
};

/**
 * @route   GET /api/apartments/projects
 * @desc    Get all unique project names
 * @access  Public
 */
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Apartment.distinct('project');
    res.status(200).json(projects.sort());
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

/**
 * @route   GET /api/apartments/:id
 * @desc    Get a single apartment by ID
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
    res.status(500).json({ message: 'Error fetching apartment', error });
  }
};

/**
 * @route   POST /api/apartments
 * @desc    Add a new apartment
 * @access  Public (should be protected in production)
 */
export const addApartment = async (req: Request, res: Response) => {
  try {
    const { unitName, unitNumber, project, ...otherData } = req.body;

    if (!unitName || !unitNumber || !project) {
      return res.status(400).json({ message: 'Unit Name, Unit Number, and Project are required' });
    }

    const newApartment = new Apartment({ unitName, unitNumber, project, ...otherData });
    await newApartment.save();

    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating apartment', error });
  }
};
