import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsArray()
    information: string[]

    @IsArray()
    document: string []
}

