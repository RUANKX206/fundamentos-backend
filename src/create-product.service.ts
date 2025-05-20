import { Injectable } from "@nestjs/common";


interface Product {
    name: string,
    model: string,
    dateManufacture: string,
    year: string,
    brand: string,
    email: string,
    cpf: string
}

interface CreateProductServiceRequest {
    name: string,
    model: string,
    dateManufacture: string,
    year: string,
    brand: string,
    email: string,
    cpf: string
}

type CreateProductServiceResponse = {
    product: Product;
}

@Injectable()
export class CreateProductService {
    constructor() {}

    async execute({
        brand,
        cpf,
        dateManufacture,
        email,
        model,
        name,
        year
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse>{
        return new Promise(()=>{});
    }
}
