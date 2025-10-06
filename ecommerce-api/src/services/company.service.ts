import { NotFoundError } from "../errors/not-found.error";
import { CompanyRepository } from "../repositories/company.repository";
import { Company } from "../models/company.model";

export class CompanyService {

    private companyRepository: CompanyRepository;

    constructor() {
        this.companyRepository = new CompanyRepository();
    }

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getall();
    }

    async getById(id: string): Promise<Company> {
        const company = await this.companyRepository.getById(id);
        if (!company) {
            throw new NotFoundError("Empresa não encontrada!");
        }
        return company;
    }

    async create(company: Company) {
        await this.companyRepository.update(company);
    }

    async update(company: Company, id: string) {
        const _company = await this.companyRepository.getById(id);
        if(!_company) {
            throw new NotFoundError("Empresa não encontrada!");
        }
            _company.logomarca = company.logomarca,
            _company.cpfCnpj = company.cpfCnpj,
            _company.razaoSocial = company.razaoSocial,
            _company.nomeFantasia = company.nomeFantasia,
            _company.telefone = company.telefone,
            _company.horarioFuncionamento = company.horarioFuncionamento,
            _company.endereco = company.endereco,
            _company.localização = company.localização,
            _company.taxaEntrega = company.taxaEntrega,
            _company.ativa = company.ativa,

        await this.companyRepository.update(_company);
    }
}