import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';
import { Product } from './entities/Product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  public async findAll(): Promise<Product[]>{
    const products = await this.productRepository.find();

    return products;
  }

  public async create(createProductDto: CreateProductDto): Promise<Product>{
    const productExits = await this.productRepository.findOne(createProductDto.name);

    if(productExits){
      throw new HttpException({
        status: HttpStatus.FOUND,
        error: 'Produto já cadastrado'
      }, HttpStatus.FOUND)
    }

    const productCreate = this.productRepository.create(createProductDto);

    return this.productRepository.save(productCreate);
  }

  public async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | any>{
    const productExits = await this.productRepository.findOne(id);

    if(!productExits){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Produto não cadastrado'
      }, HttpStatus.NOT_FOUND)
    }
    
    await this.productRepository.update(id, updateProductDto);

    return null;
  }

  public async delete(id: string): Promise<void>{
    const productExits = await this.productRepository.findOne(id);

    if(!productExits){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Produto não cadastrado'
      }, HttpStatus.NOT_FOUND)
    }

    return null;
  }
}
