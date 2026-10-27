import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;
let memoryStore = new Map();

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '' || uri.includes('your_mongodb_connection_string')) {
    console.log('ℹ️ No MONGODB_URI provided in environment. Utilizing in-memory case database.');
    isConnected = false;
    return false;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas/Database successfully');
    return true;
  } catch (err) {
    console.warn('⚠️ MongoDB connection failed (' + err.message + '). Falling back to in-memory store.');
    isConnected = false;
    return false;
  }
}

export function isDbConnected() {
  return isConnected;
}

// In-memory repository fallback for when MongoDB is not active
export const MemoryCaseRepo = {
  create: async (caseData) => {
    const id = 'case_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const doc = {
      _id: id,
      id: id,
      ...caseData,
      createdAt: new Date()
    };
    memoryStore.set(id, doc);
    return JSON.parse(JSON.stringify(doc));
  },
  findById: async (id) => {
    const doc = memoryStore.get(id);
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  },
  update: async (id, updateFn) => {
    const doc = memoryStore.get(id);
    if (!doc) return null;
    const cloned = JSON.parse(JSON.stringify(doc));
    updateFn(cloned);
    memoryStore.set(id, cloned);
    return cloned;
  },
  listAll: async () => {
    return Array.from(memoryStore.values()).map(doc => JSON.parse(JSON.stringify(doc)));
  }
};
