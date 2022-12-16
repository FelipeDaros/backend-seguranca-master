import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity('products')
export class Product{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    this.id = randomUUID();
  }
}