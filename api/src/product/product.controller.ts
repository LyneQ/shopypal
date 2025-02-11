import {Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import {ProductService} from './product.service';
import {Product} from "../../types/product";

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productService.getProducts()
    }

    @Get(':id')
    getProductById(@Param() params: any): Promise<Product | null> {

        const id = Number(params.id);
        if ( isNaN(id) ) throw new HttpException('Product ID not provided', HttpStatus.BAD_REQUEST);

      return this.productService.getProductById(params.id)
    }
}
