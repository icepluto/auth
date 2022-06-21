import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(type=>UserEntity)
    user: UserEntity


}