require('dotenv').config();
const mongoose = require('mongoose');

// ── MongoDB Connection ─────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quantumai';

// Serverless connection cache — prevents opening a new connection on every invocation
let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then(m => {
      console.log('[DB] ✅ Connected to MongoDB Atlas');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error('[DB] ❌ MongoDB connection failed:', err.message);
    throw err;
  }
  return cached.conn;
};


// ── Schemas & Models ───────────────────────────────────────────

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  company: { type: String, trim: true, default: null },
  phone: { type: String, trim: true, default: null },
  message: { type: String, default: null },
  source: { type: String, default: 'contact_form' },
}, { timestamps: true });

const demoRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  company: { type: String, trim: true, default: null },
  phone: { type: String, trim: true, default: null },
  interest: { type: String, default: null },
}, { timestamps: true });

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
}, { timestamps: true });

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  company: { type: String, trim: true, default: null },
  slot: { type: String, default: null },
  purpose: { type: String, default: null },
  product: { type: String, default: 'voice_agent' },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'completed', 'cancelled'] },
}, { timestamps: true });

// ── Create indexes ─────────────────────────────────────────────
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
demoRequestSchema.index({ createdAt: -1 });
appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index({ email: 1 });

// ── Export ──────────────────────────────────────────────────────
const Lead = mongoose.model('Lead', leadSchema);
const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { connectDB, Lead, DemoRequest, Newsletter, Appointment };
