import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql : ReturnType<typeof neon> = neon(process.env.DATABASE_URL!);
const db : ReturnType<typeof drizzle> = drizzle({ client: sql });

export default db;