import { randomUUID } from "crypto";
import { Product } from "src/products/entities/Product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { OrderEntity } from "./Order.entity";


@Entity("order_details_products")
export class OrderDetailsProducts{
  
  @PrimaryColumn()
  id: string;

  @ManyToOne(type => Product)
  @JoinColumn({name: 'products', referencedColumnName: 'id'})
  products_id: Product;

  @ManyToOne(type => OrderEntity)
  @JoinColumn({name: 'orders', referencedColumnName: 'id'})
  order_id: string;

  constructor(){
    this.id = randomUUID();
  }
}