import { ApiProperty } from "@nestjs/swagger";

export class LikeDTO {
    @ApiProperty()
    userId: number;
}

export class LikeResponseDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    publicationId: number;
    @ApiProperty()
    createdAt: Date;
}