import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import path from 'path';
import { Reflector } from '@nestjs/core';

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
    model: z.string(),
    dateManuFacture: z.string().date(),
    year: z.number(),
    brand: z.string(),
    email: z.string(),
    cpf: z.string()
        .regex(/^\d{11}$/,{
          message:'CPF deve conter exatamente 11 dígitos numéricos',
        })
        .refine(isValidCPF, {
          message: "CPF invalid",
        }),

  });

  const updateProductBodySchema = z.object({
    name: z.string().optional(),
    model: z.string().optional(),
    dateManuFacture: z.string().date().optional(),
    year: z.number().optional(),
    brand: z.string().optional(),
    email: z.string().optional(),
    cpf: z.string()
        .regex(/^\d{11}$/,{
          message:'CPF deve conter exatamente 11 dígitos numéricos',
        })
        .refine(isValidCPF, {
          message: "CPF invalid",
        }),

  });

  
  const updateBodyValidationPipe = new ZodValidationPipe(updateProductBodySchema);
  type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;


  const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
  type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;
  type Product = CreateProductBodySchema & {
    id: string;
    status: string;
  };

  //sae
  @Controller('/products')
  export class AppController {
    private readonly products: Product[] = [];
    constructor() {}

    @Post()
    @HttpCode(201)
    create(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
      const { brand, dateManuFacture, cpf, email, model, name, year } = body;
  
      return 'created';
    }

    @Get()
    findAll() {
    }
    
    @Get(':id')
    findById(@Param('id') id: string) {

    }

    @Put(':id')
    update(@Body(updateBodyValidationPipe) body: UpdateProductBodySchema): string {
      const { brand, dateManuFacture, cpf, email, model, name, year } = body;

      return 'Produto atualizado'

    }
    @Patch(":id/status")
    updateStatus(): string{

      return 'Campo atualizado'

    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return 'Produto removido';
    }

  }