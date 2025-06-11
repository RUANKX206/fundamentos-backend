import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import {  z } from 'zod';

import { Category } from "@prisma/client";
import { CreateModelService } from "./create-model.service";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";


    const createModelBodySchema = z.object({
      name: z.string().min(3),

    });

    const bodyValidationPipe = new ZodValidationPipe(createModelBodySchema);
    type createModelBodySchema = z.infer<typeof createModelBodySchema>;


    @Controller('/models')
    export class CreateModelController {
        constructor(private createModel: CreateModelService){}


        @Post()
        @HttpCode(201)
        async handle(@Body(bodyValidationPipe) body: createModelBodySchema){
          const {
                name,

          } = body;
            const data = await this.createModel.execute({
              name,
            });
            return data
        }



    }