import type { BaseRepository } from "./base-repository";

export interface BaseService<InsertType, SelectType, SearchType> {
	create(data: InsertType): Promise<SelectType>;
	find(id: number | string): Promise<SelectType | null>;
	list(query?: SearchType): Promise<SelectType[]>;
}

export abstract class BaseServiceImpl<InsertType, SelectType, SearchType>
	implements BaseService<InsertType, SelectType, SearchType>
{
	constructor(
		protected repository: BaseRepository<InsertType, SelectType, SearchType>,
	) {}

	async create(data: InsertType): Promise<SelectType> {
		return await this.repository.create(data);
	}

	async find(id: number | string): Promise<SelectType | null> {
		return await this.repository.find(id);
	}

	async list(query?: SearchType): Promise<SelectType[]> {
		return await this.repository.list(query);
	}
}
