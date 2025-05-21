import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './create-product.service';
import { ProductRepository } from './products.repository';


  @Module({
    imports: [],
    controllers: [AppController],
    providers: [PrismaService, CreateProductService, ProductRepository],
  })
  export class AppModule {}