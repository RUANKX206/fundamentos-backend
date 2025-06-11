import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';


export function isValidCPF(cpf: string): boolean {
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
}


const createProductBodySchema = z.object({
  name: z.string().min(3),
  model: z.string().min(3),
  dateManufacture: z.string().date(), 
  year: z.number(),
  brand: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(/^\d{11}$/ , {message:'Cpf deve conter exatamente 11 digitos Numericos'})
  .refine(isValidCPF,{message:"CPF Invalid"})

});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
type createProductBodySchema = z.infer<typeof createProductBodySchema>;

const UpdateProductBodySchema = z.object({
  name: z.string().min(3).optional(),
  model: z.string().min(3).optional(),
  dateManufacture: z.string().date().optional(), 
  year: z.number().optional(),
  brand: z.string().optional(),
  email: z.string().email().optional(),
  cpf: z.string().regex(/^\d{11}$/ , {message:'Cpf deve conter exatamente 11 digitos Numericos'})
  .refine(isValidCPF,{message:"CPF Invalid"})

});

const updatebodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
type UpdateProductBodySchema = z.infer<typeof createProductBodySchema>;


enum Status {
  APROVADO = 'APROVADO',
  NEGADO = 'NEGADO',
  PENDENTE = 'PENDENTE'

}

const UpdateStatusProductBodySchema = z.object({
  status: z.enum([Status.APROVADO, Status.NEGADO],{
    message: "Status must be 'APROVDADO' OR 'NEGADO' ",
  }),
});

const UpdateStatusProductBodyValidationPipe = new ZodValidationPipe(UpdateStatusProductBodySchema);
type UpdateStatusProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller("/products")
export class AppController {
  
  constructor() {}

  @Post()
  @HttpCode(201)
  getAllProducts(@Body(bodyValidationPipe) body: createProductBodySchema):string {
    const { brand, dateManufacture, year, email , model , name, cpf} = body;

   return "create";
  }
  @Get(":id")
  @HttpCode(200)
  findById(@Param(':id') id: string){
    
    return `Produto localizado`;

  }

  @Put(":id")
  @HttpCode(204)
  update(@Body(updatebodyValidationPipe) body: UpdateProductBodySchema): string{
    const { brand, dateManufacture, year, email , model , name, cpf } = body;

   
    return "Produto atualizado com sucesso!";
  }

  @Patch(":id/status")
  @HttpCode(204)
  updateProducts(@Body(UpdateStatusProductBodyValidationPipe) body: UpdateStatusProductBodySchema): string{

    return "Produtos atualizados parcialmente!";
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param(':id') id: string){
    return `Produto com id: ${id} removido`
  }

}