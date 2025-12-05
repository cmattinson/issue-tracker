import {
	commentsTable,
	issuePrioritiesTable,
	issueStatusTable,
	issuesTable,
	issueTypesTable,
	projectsTable,
	usersTable,
} from "@/db/schema";
import { db } from "@/db";
import { hashPassword } from "@/utils/password";

async function seed() {
	console.log("Seeding database...");

	const hashedPassword = await hashPassword("password123");

	await Promise.all([
		db
			.insert(usersTable)
			.values({
				name: "Chris",
				age: 29,
				email: "chris@example.com",
				password: hashedPassword,
			})
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

	await db
		.insert(projectsTable)
		.values([
			{
				name: "Some Project",
				key: "SOME",
				description: "This is a project",
				ownerId: 1,
			},
			{
				name: "Web Application",
				key: "WEB",
				description: "Frontend web application project",
				ownerId: 1,
			},
			{
				name: "Mobile App",
				key: "MOB",
				description: "Mobile application development",
				ownerId: 1,
			},
			{
				name: "API Backend",
				key: "API",
				description: "RESTful API services",
				ownerId: 1,
			},
			{
				name: "Data Pipeline",
				key: "DATA",
				description: "ETL and data processing pipeline",
				ownerId: 1,
			},
		])
		.onConflictDoNothing({ target: projectsTable.key });

	await db
		.insert(issuesTable)
		.values([
			{
				id: "SOME-0001",
				projectId: 1,
				title: "Test issue",
				description: "This is a test issue",
				issueStatusId: 1,
				issueTypeId: 1,
				priorityId: 1,
			},
			{
				id: "SOME-0002",
				projectId: 1,
				title: "Another test issue",
				description: "This is another test issue",
				issueStatusId: 1,
				issueTypeId: 1,
				priorityId: 1,
			},
		])
		.onConflictDoNothing({ target: issuesTable.id });

	await db
		.insert(commentsTable)
		.values([
			{
				issueId: "SOME-0001",
				userId: 1,
				comment: "This is a comment on the first issue",
			},
			{
				issueId: "SOME-0001",
				userId: 1,
				comment: "This is another comment on the first issue",
			},
			{
				issueId: "SOME-0002",
				userId: 1,
				comment: "This is a comment on the second issue",
			},
		])
		.onConflictDoNothing();

	console.log("Database seeded successfully...");
}

seed().catch(console.error);
