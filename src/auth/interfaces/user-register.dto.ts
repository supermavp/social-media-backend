import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class UserRegisterDTO {
    @ApiProperty()
    @IsString({ message: 'name debe ser una cadena de texto'})
    @MinLength(2, { message: 'name minimo debe contener 2 caracteres'})
    name: string;
    
    @ApiProperty()
    @IsString({ message: 'lastName debe ser una cadena de texto'})
    @MinLength(2, { message: 'lastName minimo debe contener 2 caracteres'})
    lastName: string;
    
    @ApiProperty()
    @IsEmail({}, { message: 'email debe ser un correo electronico valido' })
    email: string;

    @ApiProperty()
    @IsString({ message: 'password debe ser una cadena de texto'})
    @MinLength(8, { message: 'password minimo debe contener 8 caracteres'})
    @Exclude({ toPlainOnly: true })
    password: string;
}