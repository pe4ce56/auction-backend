import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsEmpty, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, } from "class-validator"


export class CreateAuctionDto {
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ type: Date })
    start_date: Date

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ type: Date })
    end_date: Date

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    show_document: boolean

    @IsNumber({ maxDecimalPlaces: 0 })
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    multiples: number

    @IsNumber({ maxDecimalPlaces: 0 })
    @IsOptional()
    final_price!: number

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    product: number


}

