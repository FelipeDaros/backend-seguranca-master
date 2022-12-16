import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
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
  public update(@Param('id') id: string, @Body() updateProductDto:UpdateProductDto, @Res() res:Response){
    this.productService.update(id, updateProductDto);
    return res.json({message: "Produto alterado!"});
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public delete(@Param('id')id: string){
    return this.productService.delete(id);
  }

}
