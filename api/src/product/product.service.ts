import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { products } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

    async getProductById(productId: number): Promise<products | null> {
        const whereCondition = { id: Number(productId) };

        return this.prisma.products.findUnique({ where: whereCondition });
    }

    async getProducts(): Promise<products[]> {
        return this.prisma.products.findMany();
    }
}