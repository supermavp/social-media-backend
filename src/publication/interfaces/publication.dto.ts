import { ApiProperty } from "@nestjs/swagger";
import { PublicationCreateDTO } from "./publication-create.dto";

export class PublicationDTO extends PublicationCreateDTO{
    @ApiProperty()
    id: number;
    @ApiProperty()
    createdAt: Date;
}