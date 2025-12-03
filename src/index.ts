import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import "dotenv/config";
import { fromTypes, openapi } from "@elysiajs/openapi";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { comment } from "./modules/comment";
import { issue } from "./modules/issue";
import { issueType } from "./modules/issue-type";
import { project } from "./modules/project";
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

await import("./seed.ts");

const frontend = new Elysia().use(await staticPlugin({ prefix: "/" }));

const api = new Elysia({ prefix: "/api/v1" })
	.use(
		openapi({
			references: fromTypes(),
			path: "/docs",
			documentation: { info: { title: "Issue Tracker API", version: "1.0.0" } },
		}),
	)
	.use(project)
	.use(user)
	.use(issue)
	.use(issueType)
	.use(comment);

new Elysia().use(frontend).use(api).listen(process.env.PORT);

console.log(`🚀 Server running at ${process.env.PORT}`);
