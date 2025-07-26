import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PublicationCreateDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
    @ApiProperty()
    @IsOptional()
    imageUrl?: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}