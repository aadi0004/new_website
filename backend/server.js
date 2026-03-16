require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, Lead, DemoRequest, Newsletter, Appointment } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow production domain + localhost in dev
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:8081', 'http://localhost:8082', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, cb) => {
        // Allow requests with no origin (mobile apps, curl) or whitelisted origins
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        cb(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health ─────────────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    res.json({
        status: dbState === 1 ? 'ok' : 'degraded',
        database: states[dbState] || 'unknown',
        message: 'QuantumAI API is running',
        timestamp: new Date().toISOString()
    });
});

// ── Contact Form ───────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
    const { name, email, company, phone, message } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, error: 'Name and email are required.' });
    try {
        const lead = await Lead.create({ name, email, company, phone, message, source: 'contact_form' });
        res.json({ success: true, id: lead._id, message: '✅ Message received! We\'ll be in touch within 24 hours.' });
    } catch (err) {
        console.error('[Contact Error]', err.message);
        res.status(500).json({ success: false, error: 'Server error. Please try again.' });
    }
});

// ── Demo Request ───────────────────────────────────────────────
app.post('/api/demo', async (req, res) => {
    const { name, email, company, phone, interest } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, error: 'Name and email are required.' });
    try {
        const demo = await DemoRequest.create({ name, email, company, phone, interest });
        res.json({ success: true, id: demo._id, message: '🚀 Demo request submitted! Our team will reach out within 24 hours.' });
    } catch (err) {
        console.error('[Demo Error]', err.message);
        res.status(500).json({ success: false, error: 'Server error. Please try again.' });
    }
});

// ── Newsletter ─────────────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required.' });
    try {
        await Newsletter.create({ email });
        res.json({ success: true, message: '📧 Subscribed successfully! Welcome to QuantumAI updates.' });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ success: true, message: 'You are already subscribed!' });
        }
        console.error('[Newsletter Error]', err.message);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ── Voice Agent / Call Appointment ────────────────────────────
app.post('/api/call-agent', async (req, res) => {
    const { name, email, phone, company, slot, purpose } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, error: 'Name, email, and phone are required.' });
    }
    try {
        const appt = await Appointment.create({ name, email, phone, company, slot, purpose, product: 'voice_agent', status: 'pending' });
        res.json({
            success: true,
            id: appt._id,
            message: '📞 Call scheduled! Our AI Voice Agent will contact you at the selected slot.'
        });
    } catch (err) {
        console.error('[Call Agent Error]', err.message);
        res.status(500).json({ success: false, error: 'Server error. Please try again.' });
    }
});

// ── Admin Routes ───────────────────────────────────────────────
app.get('/api/leads', async (_req, res) => {
    try {
        const data = await Lead.find().sort({ createdAt: -1 }).lean();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/demos', async (_req, res) => {
    try {
        const data = await DemoRequest.find().sort({ createdAt: -1 }).lean();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/appointments', async (_req, res) => {
    try {
        const data = await Appointment.find().sort({ createdAt: -1 }).lean();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/newsletters', async (_req, res) => {
    try {
        const data = await Newsletter.find().sort({ createdAt: -1 }).lean();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ── Start ──────────────────────────────────────────────────────
const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`[Server] QuantumAI API → http://localhost:${PORT}`);
        console.log(`[Server] Health check → http://localhost:${PORT}/api/health`);
    });
};

start();
