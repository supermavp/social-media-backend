import { ApiProperty } from "@nestjs/swagger";

export class PaginatedDTO {
    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    total: number;
}