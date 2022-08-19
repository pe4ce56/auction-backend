import { ArrayMinSize, IsArray, IsEmpty, IsInt, isInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsInt()
    @Min(0)
    @IsPositive()
    @IsNotEmpty()
    price: number

    @IsString()
    description: string;  


    @IsArray()
    information: string[]

    @IsArray()
    document: string []


    @IsArray()
    @ArrayMinSize(1)    
    images: string []
}

