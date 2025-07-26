import { Controller, Get, HttpStatus, Param, Query, Request, UseGuards } from '@nestjs/common';
import { UserQueryDTO } from './interfaces/user-query.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDTO } from './interfaces/user.dto';
import { ErrorDTO } from 'src/auth/interfaces/error.dto';
import { UserPaginatedDTO } from './interfaces/user-paginated.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ErrorDTO })
    @UseGuards(AuthGuard)
    getMe(@Request() request: { user: any}) {
        const user = request.user;
        return this.userService.findOneById(user.id);
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ErrorDTO })
    @UseGuards(AuthGuard)
    getUserById(@Param('id') id: number) {
        return this.userService.findOneById(id);
    }

    @Get('/')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: UserPaginatedDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ErrorDTO })
    @UseGuards(AuthGuard)
    getUsers(@Query() queryParams: UserQueryDTO) {
        return this.userService.findAll(queryParams);
    }
}
