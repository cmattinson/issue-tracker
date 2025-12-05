import { and, eq, type SQL } from "drizzle-orm";
import { db } from "@/db";

export interface BaseRepository<InsertType, SelectType, SearchType> {
	create(data: InsertType): Promise<SelectType>;
	find(id: number | string): Promise<SelectType | null>;
	list(query?: SearchType): Promise<SelectType[]>;
}

export abstract class BaseRepositoryImpl<InsertType, SelectType, SearchType>
	implements BaseRepository<InsertType, SelectType, SearchType>
{
	constructor(protected table: any) {}

	async create(data: InsertType): Promise<SelectType> {
		const result = await db
			.insert(this.table)
			.values(data as any)
			.returning();
		return (result as any[])[0] as SelectType;
	}

	async find(id: number | string): Promise<SelectType | null> {
		const [row] = await db
			.select()
			.from(this.table)
			.where(eq(this.table.id, id));

		return (row as SelectType) ?? null;
	}

	async list(query: SearchType = {} as SearchType): Promise<SelectType[]> {
		const conditions: SQL[] = [];

		for (const key in query) {
			const value = (query as any)[key];

			// Skip pagination and undefined values
			if (key !== "page" && value !== undefined && this.table[key]) {
				conditions.push(eq(this.table[key], value));
			}
		}

		const filter = conditions.length > 0 ? and(...conditions) : undefined;

		const results = await db
			.select()
			.from(this.table)
			.where(filter)
			.limit(10)
			.offset(((query as any).page ?? 0) * 10);

		return results as SelectType[];
	}
}
