import index from "./index.html";
import { Elysia } from "elysia";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { issuePrioritiesTable, issueTypesTable, usersTable } from "./db/schema";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { user } from "./modules/user";
import { issue } from "./modules/issue";
import { Pool } from "pg";

if (process.env.DATABASE_URL === undefined) {
	console.error("DATABASE_URL is not set");
	process.exit(1);
}

if (process.env.PORT === undefined) {
	console.error("PORT is not set");
	process.exit(1);
}

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

async function seed() {
	// Users
	await Promise.all([
		db
			.insert(usersTable)
			.values({ name: "Chris", age: 29, email: "chris@example.com" })
			.onConflictDoNothing({ target: usersTable.email }),
	]);

	await Promise.all([
		db
			.insert(issuePrioritiesTable)
			.values({ name: "Low" })
			.onConflictDoNothing({ target: issuePrioritiesTable.name }),
		db
			.insert(issuePrioritiesTable)
			.values({ name: "Medium" })
			.onConflictDoNothing({ target: issuePrioritiesTable.name }),
		db
			.insert(issuePrioritiesTable)
			.values({ name: "High" })
			.onConflictDoNothing({ target: issuePrioritiesTable.name }),
		db
			.insert(issuePrioritiesTable)
			.values({ name: "Critical" })
			.onConflictDoNothing({ target: issuePrioritiesTable.name }),
	]);

	// Issue Types
	await Promise.all([
		db
			.insert(issueTypesTable)
			.values({ name: "Bug" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueTypesTable)
			.values({ name: "Feature" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueTypesTable)
			.values({ name: "Improvement" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueTypesTable)
			.values({ name: "Question" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueTypesTable)
			.values({ name: "Other" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueTypesTable)
			.values({ name: "Duplicate" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueTypesTable)
			.values({ name: "Invalid" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueTypesTable)
			.values({ name: "Won't Fix" })
			.onConflictDoNothing({ target: issueTypesTable.name }),
	]);
}

await seed();

new Elysia({ prefix: "/api" })
	.use(openapi({ references: fromTypes(), path: "/docs" }))
	.use(user)
	.use(issue)
	.listen(process.env.PORT);

console.log(`🚀 Server running at ${process.env.PORT}`);
