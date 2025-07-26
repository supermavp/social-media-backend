import { ApiProperty } from "@nestjs/swagger";
import { UserDTO } from "src/user/interfaces/user.dto";
import { PublicationDTO } from "./publication.dto";

export class PublicationResponseDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    content: string;
    @ApiProperty()
    imageUrl: string;
    @ApiProperty()
    user: UserDTO;
    @ApiProperty()
    likesCount: number;
    @ApiProperty()
    isLikedByCurrentUser: any;
}