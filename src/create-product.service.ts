import { Injectable } from "@nestjs/common";

import { Category } from "@prisma/client";
import { ProductRepository } from "./products.repository";



interface Product {
    id : string;
    name : string; 
    description? : string;
    price : number;
    inStock : number;
    isAvailable : Boolean;
    category : Category; 
    tags : string[];
    createdAt: string | Date | undefined;
    updateAt: string | Date | null | undefined; 
}

interface CreateProductServiceRequest {
    name : string; 
    description? : string;
    price : number;
    inStock : number;
    isAvailable : boolean;
    category : Category; 
    tags : string[]

    
}


type CreateProductServiceResponse = {
    product: CreateProductService;
}

@Injectable()
export class CreateProductService {
    constructor(private productRepository: ProductRepository) {}

    async execute({
        name,  
        description, 
        price, 
        inStock,
        isAvailable, 
        category, 
        tags,
    }: CreateProductServiceRequest){
        const productWithSameName = await this.productRepository.findByName(name);

        if (productWithSameName) {
            throw new Error("Product already exists");
        }


        const product = {
            name,  
            description, 
            price, 
            inStock,
            isAvailable, 
            category, 
            tags,
        }

        const newProduct = await this.productRepository.create(product);

        return {
            product : {
            id: newProduct.id?.toString() || "",
            name,  
            description, 
            price, 
            inStock,
            isAvailable, 
            category, 
            tags,
            createdAt: newProduct.createdAt,
            updateAt: newProduct.updatedAt
            }
        };
    }
}
