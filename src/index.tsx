import { serve } from "bun";
import index from "./index.html";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./db/schema";
import * as Routes from "./routes";

if (process.env.DATABASE_URL === undefined) {
	console.error("DATABASE_URL is not set");
	process.exit(1);
}

export const db = drizzle(process.env.DATABASE_URL);

async function seed() {
	await db
		.insert(usersTable)
		.values({ name: "Chris", age: 29, email: "chris@example.com" })
		.onConflictDoNothing({ target: usersTable.email });

	await db
		.insert(usersTable)
		.values({ name: "James", age: 30, email: "james@example.com" })
		.onConflictDoNothing({ target: usersTable.email });

	await db
		.insert(usersTable)
		.values({ name: "John", age: 31, email: "john@example.com" })
		.onConflictDoNothing({ target: usersTable.email });
}

seed();

const server = serve({
	port: process.env.PORT,
	routes: {
		"/*": index,
		"/api/users": {
			GET: Routes.getUsers,
			POST: Routes.createUser,
		},
		"/api/users/:id": {
			GET: Routes.getUser,
		},
		"/api/issues": {
			GET: Routes.getIssues,
			POST: Routes.createIssue,
		},
		"/api/issues/:id": Routes.getIssue,
	},
	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
