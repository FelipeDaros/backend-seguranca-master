import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database.sqlite',
      entities: ['dist/**/entities/*.entity.js'],
      migrations: ['./src/migrations/*.js'],
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
