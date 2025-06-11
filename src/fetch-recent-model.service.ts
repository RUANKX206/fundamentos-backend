import { Injectable } from "@nestjs/common";
import { ModelsRepository } from "./models.repository";



@Injectable()
export class FetchRecentModelService {

  constructor(private modelsRepository: ModelsRepository) { }

async execute(){
        const model= await this.modelsRepository.findRecents();
        return model;
        
    }
}