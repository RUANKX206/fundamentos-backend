import { Injectable } from "@nestjs/common";

import { Category } from "@prisma/client";
import { ProductRepository } from "./products.repository";




interface Product {
    id: string,
    name: string,
    price: number,
    description?: string,
    inStock: number,
    isAvailable: boolean,
    category: Category,
    createdAt: Date | string | null,
    updatedAt: Date |string | null | undefined,
    tags: string[],
}

interface UpdateProductServiceRequest {
    id:string;
    name: string,
    price: number,
    description?: string,
    inStock: number,
    isAvailable: boolean,
    category: Category,
    tags: string[],
}

type UpdateProductServiceResponse = {
    product: UpdateProductServiceRequest;

}

@Injectable()
export class EditProductService {
    constructor(private productsRepository: ProductRepository) { }

    async execute({
    name,
    price,
    description,
    inStock,
    isAvailable,
    category,
    tags,


    }: UpdateProductServiceRequest){
    const product = {
        name,
        price,
        description,
        inStock,
        isAvailable,
        category,
        tags, 
    }
    const productWithSameName = await this.productsRepository.updateById(product);
    if(productWithSameName != null){
        throw new Error("Product not exists ");
    }

        
    }
}