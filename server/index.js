import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB, isDbConnected } from './db.js';
import casesRouter from './routes/cases.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Health & Status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'AI Mystery Room Backend API',
    database: isDbConnected() ? 'MongoDB Connected' : 'In-Memory Resilient Store',
    timestamp: new Date().toISOString()
  });
});

// Case routes
app.use('/api/cases', casesRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    message: 'AI Mystery Room API is running. Access /api/cases to create or play mysteries.'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🕵️ AI Mystery Room Backend is live on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔍 Cases Endpoint: http://localhost:${PORT}/api/cases`);
    console.log(`=================================================\n`);
  });
}

startServer();
