import { Injectable } from "@nestjs/common";

import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ProductRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: string): Promise<Prisma.ProductUncheckedCreateInput | null >{
      const product = this.prisma.product.findUnique({
        where: {
            id,
        }
    });

    return product;
    }

    async findByName(name: string): Promise<Prisma.ProductUncheckedCreateInput | null >{
      const product = this.prisma.product.findUnique({
        where: {
            name,
        }
    });

    return product;
    }

    async create(product: Prisma.ProductUncheckedCreateInput) : Promise<Prisma.ProductUncheckedCreateInput> {
        return await this.prisma.product.create({
            data: product
        });
    }


    async findRecents(): Promise<Array<Prisma.ProductUncheckedCreateInput> | null>{
        const model = this.prisma.product.findMany();
        return model
    
    }

    async updateById(product: Prisma.ProductUncheckedCreateInput): Promise<Prisma.ProductUncheckedCreateInput | null> {
    const id = product.id;
    if (!id) return null;

    const productFindById = await this.findById(id);
    if (!productFindById) return null;

    const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
            category: product.category,
            description: product.description,
            name: product.name,
            tags: product.tags,
            inStock: product.inStock,
            price: product.price,
            isAvailable: product.isAvailable
        }
    });

    return updatedProduct;
}
} 