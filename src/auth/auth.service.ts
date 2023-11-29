import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly authRepo:Repository<User>){}

    async signUp(payload:signupDto){
        const {firstName, lastName, middleName, email, password}=payload;

        const user = await this.authRepo.findOne({where:{email}});
        if(user){
            throw new HttpException('email with this user exist', 400)
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const saveUser = await this.authRepo.save({firstName, lastName, middleName, email, password:hashPassword});

        delete saveUser.password;
        return saveUser;
    }
}
