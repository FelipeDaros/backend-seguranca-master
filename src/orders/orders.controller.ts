import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService){}

  @Get()
  @HttpCode(HttpStatus.FOUND)
  public findAll(){
    return this.orderService.findAllOrders();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createOrderDto:CreateOrderDto){
    return this.orderService.create(createOrderDto);
  }
  
}
