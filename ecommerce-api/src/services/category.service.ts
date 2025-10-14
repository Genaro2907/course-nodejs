import { NotFoundError } from "../errors/not-found.error.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { Category } from "../models/cotegory.model.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { ValidationError } from "../errors/validation.error.js";

export class CategoryService {

    private categoryRepository: CategoryRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productRepository = new ProductRepository();
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
        if(await this.productRepository.getCountByCategoria(id) > 0) {
            throw new ValidationError("Não é possivel excluir uma categoria com produtos relacionados!");
        }
        await this.categoryRepository.delete(id);
    }
}