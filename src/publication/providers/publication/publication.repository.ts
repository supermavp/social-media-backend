import { DataSource, Repository } from "typeorm";
import { PublicationEntity } from "./publication.entity";
import { Injectable } from "@nestjs/common";
import { PublicationQueryDTO } from "src/publication/interfaces/publication-query.dto";
import { PublicationPaginatedDTO } from "src/publication/interfaces/publication-paginated.dto";
import { PaginatedDTO } from "src/shared/interfaces/paginted.dto";

@Injectable()
export class PublicationRepository extends Repository<PublicationEntity> {
    constructor(private dataSource: DataSource) {
        super(PublicationEntity, dataSource.createEntityManager());
    }

    async findByUserId(userId: number, queryParams: PublicationQueryDTO): Promise<PublicationPaginatedDTO> {
        const { page = 1, limit = 10 } = queryParams;
        const queryBuilder = await this.createQueryBuilder('publication');
        queryBuilder.where('publication.user = :userId', { userId });
        queryBuilder.leftJoinAndSelect('publication.user', 'user');
        queryBuilder.select([
            'publication.id',
            'publication.content',
            'publication.imageUrl',
            'publication.createdAt',
            'publication.updatedAt',
            'user.id',
            'user.name',
            'user.email',
            'user.lastName',
        ])
        queryBuilder.skip((page - 1) * limit).take(limit);
        const [publications, total] = await queryBuilder.getManyAndCount();
        return {
            publications,
            page,
            limit,
            total
        }
    }

    async createPublication(data: Partial<PublicationEntity>): Promise<PublicationEntity> {
        const newPublication = this.create(data);
        return this.save(newPublication);
    }

    async findAllPublications(queryParams: PublicationQueryDTO, authUser?: number): Promise<any> {
        const { page = 1, limit = 10, userId } = queryParams;
        const queryBuilder = await this.createQueryBuilder('publication');
        if (userId) {
            queryBuilder.where('publication.user = :userId', { userId });
        }
        queryBuilder.leftJoinAndSelect('publication.user', 'user');
        queryBuilder.leftJoin('publication.likes', 'likes')

        queryBuilder.select([
            'publication.id',
            'publication.content',
            'publication.imageUrl',
            'publication.createdAt',
            'publication.updatedAt',
            'user.id',
            'user.name',
            'user.email',
            'user.lastName',
            'COUNT(likes.id) as likeCount',
            `CASE WHEN SUM(CASE WHEN likes.user = ${authUser} THEN 1 END) > 0 THEN TRUE ELSE FALSE END AS hasLiked`
        ])
            .groupBy('publication.id')
            .addGroupBy('user.id')
            .addGroupBy('publication.createdAt')
            .addGroupBy('publication.updatedAt');

        // queryBuilder.setParameter('authUser', authUser);
        const totalQueryBuilder = this.createQueryBuilder('publication');
        if (userId) {
            totalQueryBuilder.where('publication.user = :userId', { userId });
        }
        totalQueryBuilder
            .leftJoin('publication.likes', 'likes_total'); // Alias for the total count query
        totalQueryBuilder.select('COUNT(DISTINCT publication.id)', 'count');

        // Execute the total count query
        const totalResult = await totalQueryBuilder.getRawOne();
        const total = parseInt(totalResult.count, 10);

        queryBuilder.skip((page - 1) * limit).take(limit);
        
        const publicationsRaw = await queryBuilder.getRawMany();

        const publications = publicationsRaw.map(raw => ({
            id: raw.publication_id,
            content: raw.publication_content,
            imageUrl: raw.publication_imageUrl,
            createdAt: raw.publication_createdAt,
            updatedAt: raw.publication_updatedAt,
            user: {
                id: raw.user_id,
                name: raw.user_name,
                lastName: raw.user_lastName,
                email: raw.user_email,
            },
            likeCount: parseInt(raw.likecount, 10), // Ensure it's a number
            hasLiked: Boolean(raw.hasliked), // Ensure it's a boolean
        }));
        return {
            publications,
            page,
            limit,
            total
        }
    }
}