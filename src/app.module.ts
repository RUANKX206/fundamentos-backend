import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


import { CreateProductController } from './create-product.controller';


import { ModelsRepository } from './models.repository';
import { CreateModelService } from './create-model.service';
import { CreateModelController } from './create-model.controller';
import { CreateProductService } from './create-product.service';
import { ProductRepository } from './products.repository';


  @Module({
    imports: [],
    controllers: [CreateModelController],
    providers: [PrismaService, CreateProductService, ProductRepository, CreateModelService, ModelsRepository],
  })
  export class AppModule {}