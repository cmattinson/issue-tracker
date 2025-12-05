import { describe, expect, it } from "bun:test";
import { hashPassword, verifyPassword } from "@/utils/password";

describe("Password utilities", () => {
	describe("hashPassword", () => {
		it("should hash a password successfully", async () => {
			const password = "testPassword123";
			const hash = await hashPassword(password);

			expect(typeof hash).toBe("string");
			expect(hash.length).toBeGreaterThan(0);
			expect(hash).not.toBe(password);
			expect(hash).toMatch(/^\$2[aby]\$\d+\$/);
		});

		it("should generate different hashes for the same password", async () => {
			const password = "testPassword123";
			const hash1 = await hashPassword(password);
			const hash2 = await hashPassword(password);

			expect(hash1).not.toBe(hash2);
		});

		it("should handle empty string password", async () => {
			const password = "";
			const hash = await hashPassword(password);

			expect(typeof hash).toBe("string");
			expect(hash.length).toBeGreaterThan(0);
			expect(hash).toMatch(/^\$2[aby]\$\d+\$/);
		});

		it("should handle special characters in password", async () => {
			const password = "p@$$w0rd!@#$%^&*()";
			const hash = await hashPassword(password);

			expect(typeof hash).toBe("string");
			expect(hash.length).toBeGreaterThan(0);
			expect(hash).toMatch(/^\$2[aby]\$\d+\$/);
		});
	});

	describe("verifyPassword", () => {
		it("should verify correct password successfully", async () => {
			const password = "testPassword123";
			const hash = await hashPassword(password);
			const isValid = await verifyPassword(password, hash);

			expect(isValid).toMatchSnapshot();
		});

		it("should reject incorrect password", async () => {
			const password = "testPassword123";
			const wrongPassword = "wrongPassword456";
			const hash = await hashPassword(password);
			const isValid = await verifyPassword(wrongPassword, hash);

			expect(isValid).toMatchSnapshot();
		});

		it("should reject empty string when password is not empty", async () => {
			const password = "testPassword123";
			const hash = await hashPassword(password);
			const isValid = await verifyPassword("", hash);

			expect(isValid).toMatchSnapshot();
		});

		it("should verify empty string password correctly", async () => {
			const password = "";
			const hash = await hashPassword(password);
			const isValid = await verifyPassword(password, hash);

			expect(isValid).toMatchSnapshot();
		});

		it("should handle special characters correctly", async () => {
			const password = "p@$$w0rd!@#$%^&*()";
			const hash = await hashPassword(password);
			const isValid = await verifyPassword(password, hash);

			expect(isValid).toMatchSnapshot();
		});

		it("should reject invalid hash format", async () => {
			const password = "testPassword123";
			const invalidHash = "invalid_hash_format";
			const isValid = await verifyPassword(password, invalidHash);

			expect(isValid).toMatchSnapshot();
		});

		it("should reject empty hash", async () => {
			const password = "testPassword123";
			const isValid = await verifyPassword(password, "");

			expect(isValid).toMatchSnapshot();
		});
	});

	describe("Integration tests", () => {
		it("should work together for multiple passwords", async () => {
			const passwords = [
				"password1",
				"P@ssw0rd123!",
				"verylongpasswordwithlotsofcharacters123456789",
				"短密碼",
				"motdepasse",
			];

			const results = [];
			for (const password of passwords) {
				const hash = await hashPassword(password);
				const isValid = await verifyPassword(password, hash);
				const isInvalid = await verifyPassword(`${password}wrong`, hash);

				results.push({ password, isValid, isInvalid });
			}

			expect(results).toMatchSnapshot();
		});

		it("should maintain consistency across multiple verifications", async () => {
			const password = "consistentPassword123";
			const hash = await hashPassword(password);

			const results = await Promise.all([
				verifyPassword(password, hash),
				verifyPassword(password, hash),
				verifyPassword(password, hash),
				verifyPassword(password, hash),
				verifyPassword(password, hash),
			]);

			expect(results).toMatchSnapshot();
		});
	});
});
