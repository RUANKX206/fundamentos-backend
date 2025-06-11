import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentProductService } from "./fetch-recent-products.service";



@Controller('/products')
export class FetchRecentProductController {
    constructor(private fetchRecentProduct: FetchRecentProductService){}
      
    @Get()
    @HttpCode(200)
    async handle(){
    
        const data = await this.fetchRecentProduct.execute();
        return data;
    }
}