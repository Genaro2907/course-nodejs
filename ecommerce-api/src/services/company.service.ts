import { NotFoundError } from "../errors/not-found.error.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { Company } from "../models/company.model.js";
import { UploadFileService } from "./upload-file.service.js";
import { ValidationError } from "../errors/validation.error.js";

export class CompanyService {

    private companyRepository: CompanyRepository;
    private uploadFileService: UploadFileService;

    constructor() {
        this.companyRepository = new CompanyRepository();
        this.uploadFileService = new UploadFileService("images/companies/");
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
        const logomarcaUrl = await this.uploadFileService.upload(company.logomarca);
        company.logomarca = logomarcaUrl;
        await this.companyRepository.create(company);
    }

    async update(company: Company, id: string) {
        const _company = await this.getById(id);

        if(!this.isValidUrl(company.logomarca)){
           _company.logomarca = await this.uploadFileService.upload(company.logomarca);
        }
        
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

    private isValidUrl(urlStr: string): boolean {
        try {
            const url = new URL(urlStr);
            if(url.host !== "firebasestorage.googleapis.com") {
                throw new ValidationError("URL de origem inválida!");
            }
            return true;
        }catch(err){

            if(err instanceof ValidationError) {
                throw err;
            }
            return false;
        }
        
    }
} 