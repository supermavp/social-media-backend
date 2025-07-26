import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from './providers/publication/publication.repository';
import { PublicationQueryDTO } from './interfaces/publication-query.dto';
import { PublicationCreateDTO } from './interfaces/publication-create.dto';
import { LikeRepository } from './providers/like/like.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PublicationService {
    constructor(
        private readonly publicationRepository: PublicationRepository,
        private readonly likeRepository: LikeRepository,
        private userService: UserService,
    ) { }

    async findOneByUserId(userId: number, queryParams: PublicationQueryDTO) {
        return this.publicationRepository.findByUserId(userId, queryParams);
    }

    async createPublication(publication: PublicationCreateDTO) {
        return await this.publicationRepository.createPublication(publication);
    }

    async findAll(queryParams: PublicationQueryDTO, authUserId: number) {
        return this.publicationRepository.findAllPublications(queryParams, authUserId);
    }

    async createLike(publicationId: number, userId: number) {
        const publication = this.publicationRepository.findOneBy({ id: publicationId });
        if (!publication) {
            throw new NotFoundException('Publicacion no encontrada.')
        }

        await this.userService.findOneById(userId);

        const like = await this.likeRepository.findOneBy({ publicationId, userId });
        if (like) {
            return this.likeRepository.delete({ userId, publicationId });
        }
        return this.likeRepository.createLike({ userId, publicationId });
    }
}
