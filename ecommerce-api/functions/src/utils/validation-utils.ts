import { ValidationError } from "../errors/validation.error.js";

export const isStorageUrlValid = (urlStr: string): boolean => {
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