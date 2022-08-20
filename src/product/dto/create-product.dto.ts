import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsEmpty, IsInt, isInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"
import { DocumentAbstract, ImageAbstract, InformationAbstract } from "src/common/Abstraction/ProductAbsctraction";


export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsInt()
  @Min(0)
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The age of a cat',
    minimum: 1,
    default: 1,
  })
  price: number

  @IsInt()
  @IsNotEmpty()
  category: number

  @IsString()
  description: string;


  @IsArray()
  information: InformationAbstract[]

  @IsArray()
  document: DocumentAbstract[]


  @IsArray()
  @ArrayMinSize(1)
  images: ImageAbstract[]
}

