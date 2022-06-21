import { Injectable } from '@nestjs/common';
import { ProjectEntity } from 'src/project/project.entity';
import { CreateUserDto } from './models/CreateUserDto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    async findAll(): Promise<UserEntity[]> {
        return await UserEntity.findAll();
    }
    async createUser(user: CreateUserDto): Promise<UserEntity> {
        return await UserEntity.createUser(user)
    }
    // async getProjectsForUser(user: UserEntity): Promise<ProjectEntity> {
    //     return undefined
    // }
}
