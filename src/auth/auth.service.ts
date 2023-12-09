import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   
    constructor(@InjectRepository(User) private readonly authRepo:Repository<User>, private jwtService:JwtService){}

    async signUp(payload:signupDto){
        const { email, password, ...rest}=payload;

        const user = await this.authRepo.findOne({where:{email}});
        if(user){
            throw new HttpException('email with this user exist', 400)
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const saveUser = await this.authRepo.save({ email, password:hashPassword, ...rest});

        delete saveUser.password;
        return saveUser;
    }

    async signIn(payload:loginDto){
        const {email, password}=payload; //destructuring of data

        const user = await this.authRepo.findOne({where:{email:email}});
        if(!user){
            throw new HttpException('invalid credentials', 400);
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new HttpException('invalid  credentials', 400);
        }

        const jwtPayload = {id:user.id, email:user.email}
        const jwtToken = await this.jwtService.signAsync(jwtPayload);

        

        return {token: jwtToken};
    }

}
