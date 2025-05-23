import mongoose from 'mongoose';
import Apartment from './models/apartmentModel';
import { connectDB } from './config/database';

const baseImageUrls = [
  'https://cf.bstatic.com/xdata/images/hotel/max1024x768/631183561.jpg?k=61b2665e3bd73613bb7bf2f5512cab3d355479792f768edeb03443c752a08323&o=&hp=1',
  'https://cf.bstatic.com/xdata/images/hotel/max1024x768/87616830.jpg?k=85522801b3e08f3c1a509bb1b67eb7a0afc848e723b0b259e6c7e15b0e14b996&o=&hp=1',
];

const projects = [
  'Sunrise Villas',
  'Oceanview Heights',
  'Green Haven Estates',
  'Cityscape Towers',
  'Maple Grove Residences',
  'Skyline Lofts',
];

const generateApartment = (id: number) => {
  const projectIndex = id % projects.length;
  const imageIndex = Math.floor(id / 10) % baseImageUrls.length;
  const bedrooms = Math.floor(Math.random() * 4) + 1; // 1-4 bedrooms
  const bathrooms = Math.min(bedrooms, Math.floor(Math.random() * 3) + 1); // 1-3 bathrooms, max equal to bedrooms
  const area = 400 + (bedrooms * 200 + Math.random() * 300); // Base 400 + bedroom factor + random variation
  const price = 90000 + (area * 200 + Math.random() * 50000); // Base price + area-based + random variation

  return {
    unitName: `A${id.toString().padStart(3, '0')}`, // e.g., A001, A002
    unitNumber: id.toString(),
    project: projects[projectIndex],
    description: `${bedrooms > 0 ? `${bedrooms}BR` : 'Studio'} apartment with modern amenities`,
    price: Math.round(price),
    bedrooms,
    bathrooms,
    area: Math.round(area),
    imageUrl: `${baseImageUrls[imageIndex]}&id=${id}`, // Append ID for variety
  };
};

export default async function seedDB(exitAfter = true) {
  try {
    await connectDB();
    console.log('Connected to DB, seeding...');

    // Clear existing data
    await Apartment.deleteMany({});

    // Generate and insert 40 apartments
    const apartments = Array.from({ length: 40 }, (_, i) => generateApartment(i + 1));
    await Apartment.insertMany(apartments);
    console.log('Sample apartments inserted');

    if (exitAfter) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    }
  } catch (error) {
    console.error('Seeding error:', error);
    if (exitAfter) {
      await mongoose.connection.close();
      process.exit(1);
    }
    throw error;
  }
}

if (require.main === module) {
  seedDB(true);
}