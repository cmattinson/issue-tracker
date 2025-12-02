import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import "dotenv/config";
import { fromTypes, openapi } from "@elysiajs/openapi";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
	issuePrioritiesTable,
	issueStatusTable,
	issuesTable,
	issueTypesTable,
	usersTable,
} from "./db/schema";
import { issue } from "./modules/issue";
import { issueType } from "./modules/issue-type";
import { user } from "./modules/user";

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

await (async function seed() {
	await Promise.all([
		db
			.insert(usersTable)
			.values({ name: "Chris", age: 29, email: "chris@example.com" })
			.onConflictDoNothing({ target: usersTable.email }),
		db
			.insert(issuePrioritiesTable)
			.values([
				{ name: "Low" },
				{ name: "Medium" },
				{ name: "High" },
				{ name: "Critical" },
			])
			.onConflictDoNothing({ target: issuePrioritiesTable.name }),
		db
			.insert(issueTypesTable)
			.values([
				{ name: "Bug" },
				{ name: "Feature" },
				{ name: "Improvement" },
				{ name: "Question" },
				{ name: "Other" },
				{ name: "Duplicate" },
				{ name: "Invalid" },
				{ name: "Won't Fix" },
			])
			.onConflictDoNothing({ target: issueTypesTable.name }),
		db
			.insert(issueStatusTable)
			.values([
				{ name: "Open" },
				{ name: "In Progress" },
				{ name: "Resolved" },
				{ name: "Closed" },
			])
			.onConflictDoNothing({ target: issueStatusTable.name }),
	]);
	await db.insert(issuesTable).values([
		{
			title: "Test issue",
			description: "This is a test issue",
			issueStatusId: 1,
			issueTypeId: 1,
			priorityId: 1,
		},
		{
			title: "Another test issue",
			description: "This is another test issue",
			issueStatusId: 1,
			issueTypeId: 1,
			priorityId: 1,
		},
	]);
})();

const frontend = new Elysia().use(await staticPlugin({ prefix: "/" }));

const api = new Elysia({ prefix: "/api/v1" })
	.use(
		openapi({
			references: fromTypes(),
			path: "/docs",
			documentation: { info: { title: "Issue Tracker API", version: "1.0.0" } },
		}),
	)
	.use(user)
	.use(issue)
	.use(issueType);

new Elysia().use(frontend).use(api).listen(process.env.PORT);

console.log(`🚀 Server running at ${process.env.PORT}`);
