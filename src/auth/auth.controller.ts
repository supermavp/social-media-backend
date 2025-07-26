import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserRegisterDTO } from './interfaces/user-register.dto';
import { ApiBody, ApiRequestTimeoutResponse, ApiResponse } from '@nestjs/swagger';
import { UserDTO } from '../user/interfaces/user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './interfaces/login.dto';
import { TokenDTO } from './interfaces/token.dto';
import { ErrorDTO } from './interfaces/error.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiBody({ type: UserRegisterDTO })
    @ApiResponse({ status: HttpStatus.CREATED, type: UserDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorDTO })
    register(@Body() userRegisterDto: UserRegisterDTO) {
        return this.authService.register(userRegisterDto);
    }

    @Post('login')
    @ApiBody({ type: LoginDTO })
    @ApiResponse({ status: HttpStatus.OK, type: TokenDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorDTO })
    login(@Body() loginDto: LoginDTO) {
        return this.authService.login(loginDto);
    }

    @Post('reset-password')
    resetPassword() { }
}
