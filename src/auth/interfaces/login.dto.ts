import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class LoginDTO {
    @ApiProperty()
    @IsEmail({}, { message: 'email debe ser un correo electronico valido' })
    email: string;

    @ApiProperty()
    @MinLength(8, { message: 'password minimo debe contener 8 caracteres'})
    password: string;
}