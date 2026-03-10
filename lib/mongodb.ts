import "server-only";
import mongoose, { Connection } from "mongoose";

/**
 * Shape of the cached connection stored on the Node.js global object.
 * `conn`  – the resolved Mongoose connection (null while connecting).
 * `promise` – the in-flight connection promise (null before first call).
 */
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

/**
 * Extend the Node.js global type so TypeScript recognises our cache property.
 * Using `var` inside `declare global` is required by TypeScript.
 */
declare global {
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Retrieve or initialise the global cache.
 * Caching on `globalThis` ensures Next.js hot-reloads in development
 * don't spin up a new database connection on every request.
 */
const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};
globalThis.mongooseCache = cached;

/**
 * Returns a cached Mongoose connection, creating one if it doesn't exist.
 * Safe to call repeatedly — only the first invocation opens a connection.
 */
async function connectToDatabase(): Promise<Connection> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  // Return the existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // Start a new connection if one isn't in progress
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false, // Fail fast instead of buffering when disconnected
      })
      .then((m) => m.connection);
  }

  // Await the in-flight connection and cache the result
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
