import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { QueryDTO } from "src/shared/interfaces/query.dto";

export class PublicationQueryDTO extends QueryDTO {
    @ApiPropertyOptional()
    @IsOptional()
    userId?: number;
}