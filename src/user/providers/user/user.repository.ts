import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserQueryDTO } from 'src/user/interfaces/user-query.dto';
import { UserPaginatedDTO } from 'src/user/interfaces/user-paginated.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.findOne({ where: { email } });
    }

    async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
        const newUser = this.create(userData);
        return this.save(newUser);
    }

    async updateUser(id: number, userData: Partial<UserEntity>): Promise<UserEntity | null> {
        await this.update(id, userData); // Updates the user by ID
        return this.findOne({ where: { id } }); // Returns the updated user
    }

    async findById(id: number): Promise<UserEntity | null> {
        return this.findOne({ where: { id } });
    }

    async findAllUsers(queryParams: UserQueryDTO): Promise<UserPaginatedDTO> {
        const { page = 1, limit = 10 } = queryParams;
        const queryBuilder = await this.createQueryBuilder('user');
        queryBuilder.skip((page - 1) * limit).take(limit);
        const [users, total] = await queryBuilder.getManyAndCount();
        return {
            users: users.map((userDB: UserEntity) => {
                return {
                    id: userDB.id,
                    name: userDB.name,
                    lastName: userDB.lastName,
                    email: userDB.email,
                    role: userDB.role,
                    status: userDB.status
                }
            }),
            page,
            limit,
            total
        }
    }
}