import { randomUUID } from "crypto";
import { User } from "src/users/entities/User.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('orders')
export class OrderEntity{

  @PrimaryColumn()
  id: string;

  @ManyToOne(type => User)
  @JoinColumn({name: 'users', referencedColumnName: 'id'})
  user_id: User;

  @Column()
  total: number;
  

  constructor(){
    this.id = randomUUID();
  }
}