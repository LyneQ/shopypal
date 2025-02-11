import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductController } from './product/product.controller';
import { ProductService } from "./product/product.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [],
  controllers: [AppController, ProductController, AuthController],
  providers: [AppService, ProductService, PrismaService, AuthService],
})
export class AppModule {}
