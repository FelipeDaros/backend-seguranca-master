import { Exclude } from "class-transformer";
import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class User{

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    this.id = randomUUID()
  }
}