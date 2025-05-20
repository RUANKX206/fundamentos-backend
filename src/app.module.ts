import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './create-product.service';


  @Module({
    imports: [],
    controllers: [AppController],
    providers: [PrismaService, CreateProductService],
  })
  export class AppModule {}