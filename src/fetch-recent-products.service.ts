import { Injectable } from "@nestjs/common";
import { ModelsRepository } from "./models.repository";
import { ProductRepository } from "./products.repository";


@Injectable()
export class FetchRecentProductService {

  constructor(private productRepository: ProductRepository) { }

async execute(){
        const model= await this.productRepository.findRecents();
        return model;
        
    }
}