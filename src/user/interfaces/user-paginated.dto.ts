import { ApiProperty } from "@nestjs/swagger";
import { UserDTO } from "./user.dto";
import { PaginatedDTO } from "src/shared/interfaces/paginted.dto";

export class UserPaginatedDTO extends PaginatedDTO {
    @ApiProperty({
        type: [UserDTO]
    })
    users: UserDTO[];
}