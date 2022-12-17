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
    var id_product = [];

    await this.orderRepository.save(order);
    
    createOrderDto.products_id.map(e => {
      id_product.push(e);
    });

    //console.log(id_product);

    for(var i = 0; i < createOrderDto.products_id.length; i++){
      const createOrderDetail = this.orderDetailsProductsRepository.create({
        order_id: order.id,
        products_id: id_product[i]
      });

      console.log(createOrderDetail);
      
      await this.orderDetailsProductsRepository.save(createOrderDetail);
    }

    return null;
  }

}
