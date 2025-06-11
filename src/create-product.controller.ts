import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import {  z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import { Category } from "@prisma/client";
import { CreateProductService } from "./create-product.service";

    const createProductBodySchema = z.object({
      name: z.string().min(3),
      price: z.number().min(3),
      description: z.string().optional(), 
      inStock: z.number(),
      isAvailable: z.boolean(),
      category: z.enum([Category.FASHION,Category.FOOD,Category.BOOKS,Category.ND]),
      tags: z.array(z.string())

    });

    const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
    type createProductBodySchema = z.infer<typeof createProductBodySchema>;


    @Controller('/products')
    export class CreateProductController {
        constructor(private createProduct: CreateProductService){}


        @Post()
        @HttpCode(201)
        async handle(@Body(bodyValidationPipe) body: createProductBodySchema){
          const {
                name,
                price,
                description,
                inStock,
                isAvailable,
                category,
                tags,
          } = body;
            await this.createProduct.execute({
              name,
              price,
              description,
              inStock,
              isAvailable,
              category,
              tags
            });
        }



    }