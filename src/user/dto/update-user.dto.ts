import { IntersectionType, OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    @IsOptional()
    @IsString()
    @MinLength(8)
    password: string
}
