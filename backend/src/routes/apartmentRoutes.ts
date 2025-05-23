import express from 'express';
import Apartment from '../models/apartmentModel';

const router = express.Router();

// GET all apartments with search & pagination
router.get('/', async (req, res) => {
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
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ data: apartments, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apartments', error });
  }
});

// GET list of projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Apartment.distinct('project');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// GET a single apartment by ID
router.get('/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apartment', error });
  }
});

// POST new apartment
router.post('/', async (req, res) => {
  try {
    const { unitName, unitNumber, project, ...otherData } = req.body;

    // Validate the incoming data
    if (!unitName || !unitNumber || !project) {
      return res.status(400).json({ message: 'Unit Name, Unit Number, and Project are required' });
    }

    // Create a new apartment
    const newApartment = new Apartment({
      unitName,
      unitNumber,
      project,
      ...otherData, // Spread other properties in case any additional data is passed
    });

    // Save the new apartment
    await newApartment.save();

    // Respond with the new apartment
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating apartment', error });
  }
});

export default router;
