import { LikeEntity } from "src/publication/providers/like/like.entity";
import { PublicationEntity } from "src/publication/providers/publication/publication.entity";
import { UserRole } from "src/user/enums/user-role.enum";
import { UserStatus } from "src/user/enums/user-status.enum";
import { Column, CreateDateColumn, Entity, Like, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 100 })
    name: string
    @Column({ type: 'varchar', length: 100 })
    lastName: string
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string
    @Column({ type: 'varchar', length: 255 })
    password: string
    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVO })
    status: UserStatus
    @Column({ type: 'enum', enum: UserRole, default: UserRole.STANDARD })
    role: UserRole
    @Column({ type: 'boolean', default: false })
    reset: boolean;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => PublicationEntity, (publication) => publication.user)
    publications: PublicationEntity[]

    @OneToMany(() => LikeEntity, (like) => like.user)
    likes: LikeEntity[];
}