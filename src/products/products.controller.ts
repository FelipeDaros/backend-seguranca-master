import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService){}
  
  @Get()
  @HttpCode(HttpStatus.FOUND)
  public findAll(){
    return this.productService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createProductDto:CreateProductDto){
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public update(@Param('id') id: string, @Body() updateProductDto:UpdateProductDto){
    return this.productService.update(id, updateProductDto);
  }
}
