import { HttpException, Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from '../dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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

    async signIn(payload:loginDto, @Res()res:Response){
        const {email, password}=payload; //destructuring of data

        const user = await this.authRepo.findOne({where:{email:email}});
        if(!user){
            throw new HttpException('invalid credentials for email', 400);
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new HttpException('invalid  credentials for password', 400);
        }

        const jwtPayload = {id:user.id, email:user.email}
        const jwtToken = await this.jwtService.signAsync(jwtPayload);

        

        // return {token: jwtToken};

        res.cookie('User isAuthenticated', jwtToken, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 24
        });
        return res.send({
            statusCode: 201,
            success: true,
            userToken: jwtToken
        
        })
    }

    async logout(@Req() req :Request, @Res()res:Response){
     
        const clear =  res.clearCookie('User isAuthenticated');
        const response = res.send({statusCode: 200, message:'logged out successfully'});
        return{
            clear,
            response
        }
    }

}
