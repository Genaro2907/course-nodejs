import { ErrorBase } from "./base.error";

export class ForbiddenError extends ErrorBase {
    constructor(message = "Não Autorizado"){
        super(403, message);
    }
}