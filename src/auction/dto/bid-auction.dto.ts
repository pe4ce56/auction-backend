import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class BidAuctionDTO {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    price: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string
}