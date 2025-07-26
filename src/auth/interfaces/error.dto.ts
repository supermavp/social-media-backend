import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ErrorDTO {
    @ApiProperty()
    message: string;

    @ApiProperty()
    error?: string;
    
    @ApiProperty()
    statusCode: number;
}