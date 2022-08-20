import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, } from "class-validator"


export class CreateAuctionDto {
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ type: Date })
    start_date: Date

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ type: Date })
    end_date: Date

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    show_document: boolean


    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    product: number


}

