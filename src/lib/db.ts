import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache;
}

const cached: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Drop the rejected promise, or it is cached forever: every later
    // connectDB() would see `cached.promise` as truthy, await the same
    // rejection and throw, so a single transient failure (a DNS blip, an Atlas
    // IP-allowlist gap at boot) turns into permanent 500s across every API
    // route until the process is restarted. Clearing it lets the next request
    // dial again.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;