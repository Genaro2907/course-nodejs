import { User } from "../models/user.model.";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {

    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getall();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!");
        }
        return user;
    }

    async create(user: User) {
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        await this.userRepository.update(user);
    }

    async update(user: User, id: string) {
        const _user = await this.userRepository.getById(id);
        if(!_user) {
            throw new NotFoundError("Usuário não encontrado!");
        }
        _user.name = user.name;
        _user.email = user.email;

        this.userRepository.update(_user);
    }

    async delete(id: string) {
        await this.userRepository.delete(id);
    }
}