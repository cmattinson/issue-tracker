import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { eq } from "drizzle-orm";
import { issuesTable, projectsTable } from "@/db/schema";
import { db } from "@/index";
import { IssueRepository } from "@/modules/issue/repository";

describe("generateIssueId", () => {
	let testProjectId: number;

	beforeEach(async () => {
		// Create a test project
		const [project] = await db
			.insert(projectsTable)
			.values({
				name: "Test Project",
				key: "TEST",
				description: "A test project",
				ownerId: 1,
			})
			.returning();

		if (!project) {
			throw new Error("Failed to create test project");
		}
		testProjectId = project.id;
	});

	afterEach(async () => {
		// Clean up test data
		await db
			.delete(issuesTable)
			.where(eq(issuesTable.projectId, testProjectId));
		await db.delete(projectsTable).where(eq(projectsTable.id, testProjectId));
	});

	it("should generate TEST-0001 when no issues exist", async () => {
		const issueData = {
			projectId: testProjectId,
			title: "Test Issue",
			description: "Test description",
			issueStatusId: 1,
			issueTypeId: 1,
			priorityId: 1,
		};

		const result = await IssueRepository.create(issueData);
		expect(result.id).toBe("TEST-0001");
	});

	it("should generate TEST-0002 when TEST-0001 exists", async () => {
		// Create first issue
		await db.insert(issuesTable).values({
			id: "TEST-0001",
			projectId: testProjectId,
			title: "First Issue",
			description: "First description",
			issueStatusId: 1,
			issueTypeId: 1,
			priorityId: 1,
		});

		const issueData = {
			projectId: testProjectId,
			title: "Second Issue",
			description: "Second description",
			issueStatusId: 1,
			issueTypeId: 1,
			priorityId: 1,
		};

		const result = await IssueRepository.create(issueData);
		expect(result.id).toBe("TEST-0002");
	});

	it("should generate TEST-0004 when TEST-0001, TEST-0002, TEST-0003 exist", async () => {
		// Create multiple issues
		await db.insert(issuesTable).values([
			{
				id: "TEST-0001",
				projectId: testProjectId,
				title: "First Issue",
				description: "First description",
				issueStatusId: 1,
				issueTypeId: 1,
				priorityId: 1,
			},
			{
				id: "TEST-0002",
				projectId: testProjectId,
				title: "Second Issue",
				description: "Second description",
				issueStatusId: 1,
				issueTypeId: 1,
				priorityId: 1,
			},
			{
				id: "TEST-0003",
				projectId: testProjectId,
				title: "Third Issue",
				description: "Third description",
				issueStatusId: 1,
				issueTypeId: 1,
				priorityId: 1,
			},
		]);

		const issueData = {
			projectId: testProjectId,
			title: "Fourth Issue",
			description: "Fourth description",
			issueStatusId: 1,
			issueTypeId: 1,
			priorityId: 1,
		};

		const result = await IssueRepository.create(issueData);
		expect(result.id).toBe("TEST-0004");
	});

	it("should handle gaps in numbering correctly", async () => {
		// Create issues with a gap
		await db.insert(issuesTable).values([
			{
				id: "TEST-0001",
				projectId: testProjectId,
				title: "First Issue",
				description: "First description",
				issueStatusId: 1,
				issueTypeId: 1,
				priorityId: 1,
			},
			{
				id: "TEST-0005",
				projectId: testProjectId,
				title: "Fifth Issue",
				description: "Fifth description",
				issueStatusId: 1,
				issueTypeId: 1,
				priorityId: 1,
			},
		]);

		const issueData = {
			projectId: testProjectId,
			title: "New Issue",
			description: "New description",
			issueStatusId: 1,
			issueTypeId: 1,
			priorityId: 1,
		};

		const result = await IssueRepository.create(issueData);
		expect(result.id).toBe("TEST-0006");
	});
});
