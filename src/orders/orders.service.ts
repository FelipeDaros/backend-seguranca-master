import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/Product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrderEntity } from './entities/Order.entity';
import { OrderDetailsProducts } from './entities/OrderDetailsProducts.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailsProducts)
    private readonly orderDetailsProductsRepository: Repository<OrderDetailsProducts>,
    @InjectRepository(Product)  
    private readonly productRepository: Repository<Product>
  ){}

  public async findAllOrders(){
    const orders = await this.orderRepository.find();
    
    return orders;
  }

  public async create(createOrderDto:CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);

    await this.orderRepository.save(order);

    //const itens = await Promise.all(createOrderDto.products_id.map((product) => this.preloadIdProducts(product.id)));

    console.log();

    const createOrderDetails = this.orderDetailsProductsRepository.create({
      order_id: order.id,
      products_id: "45daf329-8d8e-4c8f-9fb6-3b365237f8ca"
    })

    await this.orderDetailsProductsRepository.save(createOrderDetails)
    

    return createOrderDetails
  }

  private async preloadIdProducts(id: string){
    const iten = await this.productRepository.findOne(id);

    if(iten){
      return iten;
    }

    return null;
  }


}
