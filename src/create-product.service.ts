import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./products.repository";


interface Product {
    id : string;
    name : string; 
    description : string;
    price : number;
    inStock : number;
    isAvailable : Boolean;
    category : string; 
    tags : String[];
    createdAt: Date;
    updateAt: Date;
}

interface CreateProductServiceRequest {
    id : string;
    name : string; 
    description : string;
    price : number;
    inStock : number;
    isAvailable : Boolean;
    category : string; 
    tags : String[]
    createdAt: Date;
    updateAt: Date;
    
}


type CreateProductServiceResponse = {
    product: CreateProductService;
}

@Injectable()
export class CreateProductService {
    constructor(private productRepository: ProductRepository) {}

    async execute({
        id,
        name,  
        description, 
        price, 
        inStock,
        isAvailable, 
        category, 
        tags,
        createdAt,
        updateAt,
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse>{
        return new Promise(()=>{});
    }
}
