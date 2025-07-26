import { ApiProperty } from "@nestjs/swagger";

export class TokenDTO {
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    type: string;
}