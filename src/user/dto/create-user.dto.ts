import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEmpty, IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength, } from "class-validator"
import { ROLES } from "../entities/user.entity";

enum ROLESDTO {
    TENANT = ROLES.TENANT,
    OPERATOR = ROLES.OPERATOR
}


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsEnum(ROLESDTO)
    @IsNotEmpty()
    role: ROLESDTO

    @IsInt()
    @IsNotEmpty()
    tenant: number

}

