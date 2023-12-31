import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { Roles } from "../enum/role";

@Entity()
export class User extends Base{
    @Column()
    firstName: string

    @Column()
    lastName: string;

    @Column({default:''})
    middleName?: string

    @Column({
        unique:true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.unknown
    })
    role:Roles
    
}