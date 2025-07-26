import { UserEntity } from "src/user/providers/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PublicationEntity } from "../publication/publication.entity";

@Entity('like')
@Unique(['userId', 'publicationId'])
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    publicationId: number;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(
        () => UserEntity,
        (user) => user.likes,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(
        () => PublicationEntity,
        (publication) => publication.likes,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'publicationId' })
    publication: PublicationEntity;

}