# 🏠 Apartment Listings App

A full-stack web application for browsing, filtering, and managing apartment listings, built with **TypeScript**, **MongoDB**, **Express**, and **Next.js**.

## 🌟 Features

- 🏙 Filter apartments by project name
- 🔍 Search by unit name, number, or project
- 📱 Responsive design (mobile-first)
- 🎨 Stylish UI with Tailwind CSS
- 🔄 Paginated results
- 🌱 Seed database with sample data

## 🛠️ Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Frontend    | Next.js, TypeScript, Tailwind CSS   |
| Backend     | Express, TypeScript, Mongoose       |
| Database    | MongoDB                             |

## 📦 API Endpoints

### `GET /api/apartments`

Fetch apartments with filters and pagination.

**Query Parameters:**

| Param     | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `search`  | string   | Matches unitName, unitNumber, project |
| `projects`| string   | Comma-separated project names         |
| `page`    | number   | Page number (default: 1)              |
| `limit`   | number   | Results per page (default: 6)         |

**Response:**
```json
{
  "data": [ ... ],
  "total": 40
}
```

### `GET /api/apartments/projects`

Returns a list of distinct project names:
```json
[
  "Skyline Lofts",
  "Sunrise Villas",
  ...
]
```

### `GET /api/apartments/:id`

Fetch a single apartment by ID.

## 🧪 Environment Variables

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/apartment-app
SEED_ON_START=true
```

And in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/apartments
```

## 🚀 Run Locally

### Without Docker

1. Start MongoDB:
```bash
mongod
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Seed database:
```bash
cd backend
npm run seed
```

4. Start development servers:
```bash
# Backend
npm run dev

# In another terminal
cd ../frontend
npm run dev
```

Access the app at: [http://localhost:3000](http://localhost:3000)

### With Docker

1. Make sure Docker is installed and running

2. Build and start containers:
```bash
docker-compose up --build
```

3. (Optional) Seed database manually:
```bash
docker exec -it apartment-backend npm run seed
```

## 🧪 Sample Data

The seeding script will create 40 sample apartments spread across 6 project names, each with:

- Bedrooms, bathrooms, area
- Generated unit names/numbers
- Randomized price
- Predefined images

## 📁 Project Structure

```
apartment-app/
├── backend/
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express route handlers
│ ├── controllers/ # API logic
│ ├── config/ # MongoDB connection logic
│ ├── tests/ # Jest & Supertest test cases
│ ├── seed.ts # Mock data seeder
│ ├── server.ts # Main Express server entry
│ ├── Dockerfile
│ └── .env # Environment variables
│
├── frontend/
│ ├── components/ # UI components
│ ├── pages/ # Next.js pages
│ ├── types/ # Shared TypeScript interfaces
│ ├── styles/ # Tailwind and global styles
│ ├── Dockerfile
│ └── .env.local # Frontend env vars
│
├── docker-compose.yml
├── README.md
└── .gitignore
```
