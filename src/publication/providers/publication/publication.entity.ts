import { UserEntity } from "src/user/providers/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LikeEntity } from "../like/like.entity";

@Entity('publication')
export class PublicationEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text' })
    content: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    imageUrl?: string;
    @Column()
    userId: number;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(
        () => UserEntity,
        (user) => user.publications,
        {
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @OneToMany(() => LikeEntity, (like) => like.publication)
    likes: LikeEntity[];
}