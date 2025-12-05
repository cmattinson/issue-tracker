import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (process.env.DATABASE_URL === undefined) {
	console.error("DATABASE_URL is not set");
	process.exit(1);
}

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
