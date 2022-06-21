import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import * as crypto from 'crypto'
import { ProjectEntity } from 'src/project/project.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../user/models/CreateUserDto';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    public firstName: string

    @Column({ length: 50 })
    public lastName: string

    @Column({ length: 50 })
    public username: string

    @Column({
        length: 250,
        //do not return this column 
        //when using find methods or running a query to select a user.
        select: false,
        //set the actual column name to be password,
        //if this options is not set then TypeORM will autogenerate a column name from the variable name.
        name: 'password',
    })
    public password_hash: string

    set password(password: string) {
        const passHash = crypto.createHmac('sha256', password).digest('hex');
        this.password_hash = passHash;
    }

    @OneToMany(type => ProjectEntity, project => project.user)
    projects: ProjectEntity[]

    public static async findAll(): Promise<UserEntity[]> {
        const users: UserEntity[] = await UserEntity.find()
        if (users.length > 0) {
            return Promise.resolve(users)
        } else {
            //here no finally
            throw new NotFoundException(`no user`)
        }
    }

    public static async createUser(user: CreateUserDto): Promise<UserEntity> {
        let u: UserEntity
        u = await UserEntity.findOne({ where: { username: user.username } })
        if (u) {
            throw new NotFoundException(`exist`)
        } else {
            u = new UserEntity()
            Object.assign(u, user)
            return await UserEntity.save(u)
        }
    }
}