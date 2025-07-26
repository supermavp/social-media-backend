import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export abstract class QueryDTO {
    @ApiPropertyOptional({
        description: 'Número de página para la paginación.',
        type: Number,
        minimum: 1,
        default: 1,
    })
    @IsOptional()
    @IsNumber({}, { message: 'El parámetro "page" debe ser un número.' })
    @Min(1, { message: 'La página debe ser al menos 1.' })
    @Type(() => Number)
    @Transform(({ value }) => (value === undefined ? 1 : value))
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Número de elementos por página.',
        type: Number,
        minimum: 1,
        maximum: 100,
        default: 10,
    })
    @IsOptional()
    @IsNumber({}, { message: 'El parámetro "limit" debe ser un número.' })
    @Min(1, { message: 'El límite debe ser al menos 1.' })
    @Max(100, { message: 'El límite no puede exceder 100.' })
    @Type(() => Number)
    @Transform(({ value }) => (value === undefined ? 10 : value))
    limit?: number = 10;
}