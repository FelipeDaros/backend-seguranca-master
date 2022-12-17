import { IsArray, IsNumber, IsString, } from "class-validator";
import { Product } from "src/products/entities/Product.entity";
import { User } from "src/users/entities/User.entity";



export class CreateOrderDto{

  @IsString()
  user_id: User;

  @IsNumber()
  total: number;

  @IsArray()
  products_id: Product[];
}