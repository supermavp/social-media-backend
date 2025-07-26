import { ApiProperty, OmitType } from "@nestjs/swagger";
import { UserRegisterDTO } from "../../auth/interfaces/user-register.dto";

export class UserDTO extends OmitType(UserRegisterDTO, ['password'] as const) {
    @ApiProperty()
    id: number;
    @ApiProperty()
    status: string;
    @ApiProperty()
    role: string;
}