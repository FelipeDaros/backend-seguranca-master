import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}