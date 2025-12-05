import { NotFoundError } from "elysia";
import type { BaseRepository } from "./base-repository";

export interface BaseService<InsertType, SelectType, SearchType> {
	create(data: InsertType): Promise<SelectType>;
	find(id: number | string): Promise<SelectType>;
	list(query?: SearchType): Promise<SelectType[]>;
}

export abstract class BaseServiceImpl<InsertType, SelectType, SearchType>
	implements BaseService<InsertType, SelectType, SearchType>
{
	constructor(
		protected repository: BaseRepository<InsertType, SelectType, SearchType>,
		protected serviceName: string,
	) {}

	async create(data: InsertType): Promise<SelectType> {
		return await this.repository.create(data);
	}

	async find(id: number | string): Promise<SelectType> {
		const result = await this.repository.find(id);
		if (result === null) {
			throw new NotFoundError(`${this.serviceName} with ID ${id} not found`);
		}
		return result;
	}

	async list(query?: SearchType): Promise<SelectType[]> {
		return await this.repository.list(query);
	}
}
