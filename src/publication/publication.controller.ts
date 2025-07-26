import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ErrorDTO } from 'src/auth/interfaces/error.dto';
import { PublicationDTO } from './interfaces/publication.dto';
import { PublicationCreateDTO } from './interfaces/publication-create.dto';
import { PublicationQueryDTO } from './interfaces/publication-query.dto';
import { PublicationService } from './publication.service';
import { PublicationPaginatedDTO, PublicationPaginatedResponseDTO } from './interfaces/publication-paginated.dto';
import { LikeDTO, LikeResponseDTO } from './interfaces/like.dto';

@Controller('publication')
export class PublicationController {
    constructor(private publicationService: PublicationService) { }

    @Post('/')
    @ApiBody({ type: PublicationCreateDTO })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: PublicationDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ErrorDTO })
    @UseGuards(AuthGuard)
    createPublication(@Body() publicationCreateDto: PublicationCreateDTO) {
        return this.publicationService.createPublication(publicationCreateDto);
    }

    @Get('/')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: PublicationPaginatedResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ErrorDTO })
    @UseGuards(AuthGuard)
    getPublications(@Query() queryParams: PublicationQueryDTO, @Request() request: { user: any }) {
        const user = request.user;
        return this.publicationService.findAll(queryParams, user.id);
    }

    @Put(":id/like")
    @ApiBearerAuth()
    @ApiBody({ type: LikeDTO })
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ErrorDTO })
    @UseGuards(AuthGuard)
    saveLike(@Param("id") id: number, @Body() likeDto: LikeDTO) {
        this.publicationService.createLike(id, likeDto.userId);
    }
}
