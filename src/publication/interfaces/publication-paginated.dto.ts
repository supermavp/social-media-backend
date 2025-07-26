import { ApiProperty } from "@nestjs/swagger";
import { PaginatedDTO } from "src/shared/interfaces/paginted.dto";
import { PublicationDTO } from "./publication.dto";
import { PublicationResponseDTO } from "./publication-response.dto";

export class PublicationPaginatedDTO extends PaginatedDTO {
    @ApiProperty({
        type: [PublicationDTO]
    })
    publications: PublicationDTO[]
}

export class PublicationPaginatedResponseDTO extends PaginatedDTO {
    @ApiProperty({
        type: [PublicationResponseDTO]
    })
    publications: PublicationDTO[]
}