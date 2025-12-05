import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import "dotenv/config";
import { fromTypes, openapi } from "@elysiajs/openapi";
import { comment } from "./modules/comment";
import { issue } from "./modules/issue";
import { issuePriority } from "./modules/issue-priority";
import { issueStatus } from "./modules/issue-status";
import { issueType } from "./modules/issue-type";
import { project } from "./modules/project";
import { user } from "./modules/user";

if (process.env.PORT === undefined) {
	console.error("PORT is not set");
	process.exit(1);
}

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
	.onError(({ code, error, set }) => {
		if (code === "VALIDATION") {
			set.status = 400;
			return { error: "Validation failed", details: (error as Error).message };
		}

		const errorMessage = (error as Error).message;
		if (errorMessage.includes("not found")) {
			set.status = 404;
			return { error: errorMessage };
		}

		set.status = 500;
		return { error: "Internal server error", message: errorMessage };
	})
	.use(project)
	.use(user)
	.use(issue)
	.use(issueStatus)
	.use(issueType)
	.use(issuePriority)
	.use(comment);

new Elysia().use(frontend).use(api).listen(process.env.PORT);

console.log(`Server running at ${process.env.PORT}...`);
