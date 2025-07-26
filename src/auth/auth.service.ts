import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegisterDTO } from './interfaces/user-register.dto';
import { UserDTO } from '../user/interfaces/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './interfaces/login.dto';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async register(user: UserRegisterDTO): Promise<UserDTO> {
        const userDB = await this.userService.createUser(user);
        return {
            id: userDB.id,
            name: userDB.name,
            lastName: userDB.lastName,
            email: userDB.email,
            role: userDB.role,
            status: userDB.status
        }
    }

    async login(loginDto: LoginDTO) {
        const user = await this.userService.findOneByEmail(loginDto.email);
        if (user) {
            const isValid = await bcrypt.compare(loginDto.password, user.password);
            if (isValid) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
                return {
                    access_token: await this.jwtService.signAsync(payload),
                    type: 'Bearer',
                }
            }
        }
        throw new HttpException(
            'Username and/or password are incorrect',
            HttpStatus.BAD_REQUEST,
        )
    }
}
