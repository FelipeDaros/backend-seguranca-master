import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private readonly orderDetailsProductsRepository: Repository<OrderDetailsProducts>
  ){}

  public async findAllOrders(){
    const orders = await this.orderRepository.find();
    
    return orders;
  }

  public async create(createOrderDto:CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);

    await this.orderRepository.save(order);
     
    const createOrderDetails = this.orderDetailsProductsRepository.create({
      order_id: order.id,
      products_id: createOrderDto.products_id
    });

    

    await this.orderDetailsProductsRepository.save(createOrderDetails); 

    return order;
  }


}
