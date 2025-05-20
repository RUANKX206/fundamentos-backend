import {Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';

const createProductBodySchema = z.object({
  name: z.string().min(2),
  model: z.string().max(20),
  dateManufacture: z.string().date(""),
  year: z.string().min(1).max(4),
  brand: z.string().trim().min(1),
  email: z.string().email(),
  cpf: z.string().regex(new RegExp("^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}")),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);  

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller("/product")
export class AppController {
  constructor(){}


  @Post()
  create(@Body(bodyValidationPipe) body : CreateProductBodySchema): string {
    return "create";
  }
}
