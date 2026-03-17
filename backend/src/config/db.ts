import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

/**
 * Initialize the database connection using Neon and Drizzle ORM.
 * Drizzle ORM provides a type-safe query builder for interacting with the database, while Neon offers a serverless PostgreSQL solution.
 */
const sql : ReturnType<typeof neon> = neon(process.env.DATABASE_URL!);
const db : ReturnType<typeof drizzle> = drizzle({ client: sql });

export default db;