import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import path from 'path';
import { Reflector } from '@nestjs/core';
import { CreateProductService } from './create-product.service';
import { Category } from '@prisma/client';

  function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += +cpf.charAt(i) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== +cpf.charAt(9)) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += +cpf.charAt(i) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === +cpf.charAt(10);
  };


  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    inStock: z.number().int().nonnegative(),
    isAvailable: z.boolean(),
    category: z.string(),
    tags: z.array(z.string())

  });

  const updateProductBodySchema = z.object({
    

  });

  
  const updateBodyValidationPipe = new ZodValidationPipe(updateProductBodySchema);
  type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;


  const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
  type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

  //sae
  @Controller('/products')
  export class AppController {
    constructor(private createProduct: CreateProductService){}

    @Post()
    @HttpCode(201)
    async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
      const {
        name,  
        description, 
        price, 
        inStock,
        isAvailable, 
        category, 
        tags,
      } = body;

      await this.createProduct.execute({
        name,  
        description, 
        price, 
        inStock,
        isAvailable, 
        category: Category[category], 
        tags
      });

    }

  }