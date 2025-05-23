import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './config/database';
import apartmentRoutes from './routes/apartmentRoutes';
import seedDB from './seed';

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/apartments', apartmentRoutes);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    if (process.env.SEED_ON_START === 'true') {
      console.log('[DB] Seeding enabled — inserting mock data...');
      await seedDB(false); 
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export default app; 
