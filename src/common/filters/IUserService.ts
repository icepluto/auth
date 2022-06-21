import { ProjectEntity } from "src/project/project.entity";
import { CreateUserDto } from "src/user/models/CreateUserDto";
import { UserEntity } from "src/user/user.entity";

export interface IUserService{
    findAll():Promise<UserEntity[]>
    createUser(user:CreateUserDto):Promise<UserEntity>
    getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>
}