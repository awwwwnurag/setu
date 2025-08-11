import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hackathon';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const supplierSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

// Get all suppliers
app.get('/api/suppliers', async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
});

// Add a new supplier
app.post('/api/suppliers', async (req, res) => {
  const { name, location, rating } = req.body;
  const supplier = new Supplier({ name, location, rating });
  await supplier.save();
  res.status(201).json(supplier);
});

// Delete a supplier by ID
app.delete('/api/suppliers/:id', async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

const vendorSchema = new mongoose.Schema({
  name: String,
  location: String,
  phone: String,
  groupBuy: Boolean,
});
const Vendor = mongoose.model('Vendor', vendorSchema);

// Get all vendors
app.get('/api/vendors', async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

// Register a new vendor
app.post('/api/vendors', async (req, res) => {
  const { name, location, phone, groupBuy } = req.body;
  const vendor = new Vendor({ name, location, phone, groupBuy });
  await vendor.save();
  res.status(201).json(vendor);
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String, // 'vendor' or 'supplier'
  phone: String,
  location: String,
});
const User = mongoose.model('User', userSchema);

// Register user
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, phone, location } = req.body;
  if (!name || !email || !password || !role || !phone || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashed, role, phone, location });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: 'Registration failed' });
    }
  }
});

// On login, store session
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, 'SECRET_KEY', { expiresIn: '1d' });
  await Session.create({ token, userId: user._id });
  res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

// Logout: remove session
app.post('/api/auth/logout', auth, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  await Session.deleteOne({ token });
  res.json({ message: 'Logged out' });
});

// Update auth middleware to check session
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, 'SECRET_KEY');
    Session.findOne({ token }, (err, session) => {
      if (err || !session) return res.status(401).json({ error: 'Session expired' });
      req.user = payload;
      next();
    });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

const sessionSchema = new mongoose.Schema({
  token: String,
  userId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now, expires: '7d' },
});
const Session = mongoose.model('Session', sessionSchema);

// DEMO SEED ENDPOINT (for development/demo only)
app.post('/api/demo-seed', async (req, res) => {
  // Demo suppliers
  const demoSuppliers = [
    { name: 'FreshMart', location: 'Delhi', rating: 4.8 },
    { name: 'VeggieHub', location: 'Mumbai', rating: 4.6 },
    { name: 'SpiceWorld', location: 'Kolkata', rating: 4.9 },
    { name: 'DairyDirect', location: 'Chennai', rating: 4.7 },
    { name: 'GrainBazaar', location: 'Bangalore', rating: 4.5 },
  ];
  // Demo vendors
  const demoVendors = [
    { name: 'Ravi Kumar', location: 'Delhi', phone: '9876543210', groupBuy: true },
    { name: 'Sita Devi', location: 'Mumbai', phone: '9123456789', groupBuy: false },
    { name: 'Amit Singh', location: 'Kolkata', phone: '9988776655', groupBuy: true },
  ];
  await Supplier.deleteMany({});
  await Vendor.deleteMany({});
  await Supplier.insertMany(demoSuppliers);
  await Vendor.insertMany(demoVendors);
  res.json({ message: 'Demo suppliers and vendors seeded!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 