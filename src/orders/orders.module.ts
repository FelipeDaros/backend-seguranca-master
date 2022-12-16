import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/Order.entity';
import { OrderDetailsProducts } from './entities/OrderDetailsProducts.entity';
import { User } from 'src/users/entities/User.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderDetailsProducts])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
