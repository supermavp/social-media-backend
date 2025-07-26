import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRegisterDTO } from 'src/auth/interfaces/user-register.dto';
import { UserQueryDTO } from './interfaces/user-query.dto';
import { UserRepository } from './providers/user/user.repository';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async findOneByEmail(email: string) {
        return await this.userRepository.findByEmail(email);
    }

    async findOneByEmailWithoutPassword(email: string) {
        const userDB = await this.findOneByEmail(email);
        if (userDB) {
            return {
                id: userDB.id,
                name: userDB.name,
                lastName: userDB.lastName,
                email: userDB.email,
                role: userDB.role,
                status: userDB.status
            }
        }
        throw new NotFoundException('User not found')
    }

    async findOneById(id: number) {
        const userDB = await this.userRepository.findById(id);
        if (userDB) {
            return {
                id: userDB.id,
                name: userDB.name,
                lastName: userDB.lastName,
                email: userDB.email,
                role: userDB.role,
                status: userDB.status
            }
        }
        throw new NotFoundException('User not found');
    }

    async createUser(user: UserRegisterDTO) {
        const password = await bcrypt.hash(user.password, 12);
        return await this.userRepository.save({ ...user, password });
    }

    async findAll(queryParams: UserQueryDTO) {
        return this.userRepository.findAllUsers(queryParams);
    }
}
