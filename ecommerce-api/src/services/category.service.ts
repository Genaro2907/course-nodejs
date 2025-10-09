import { NotFoundError } from "../errors/not-found.error.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { Category } from "../models/cotegory.model.js";

export class CategoryService {

    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getall();
    }

    async getById(id: string): Promise<Category> {
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new NotFoundError("Categoria não encontrada!");
        }
        return category;
    }

    async create(category: Category) {
        await this.categoryRepository.create(category);
    }

    async update(category: Category, id: string) {
        const _category = await this.getById(id);

        _category.descricao = category.descricao;
        _category.ativa = category.ativa;

        await this.categoryRepository.update(_category);
    }

    async delete(id: string) {
        await this.categoryRepository.delete(id);
    }
}