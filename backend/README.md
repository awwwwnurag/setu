# Hackathon Backend (MongoDB + Express)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure MongoDB is running locally (default: mongodb://localhost:27017/hackathon)

3. Start the backend server:
   ```bash
   npm run dev
   # or
   npm start
   ```

## API Endpoints

- `GET /api/suppliers` — Get all suppliers
- `POST /api/suppliers` — Add a new supplier (JSON: `{ name, location, rating }`)
- `DELETE /api/suppliers/:id` — Delete a supplier by ID

## Notes
- The backend runs on port 5000 by default.
- You can change the MongoDB connection string in `index.js` if needed. 