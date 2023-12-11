import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { signupDto } from '../dto/signup.dto';
import { AuthService } from './auth.service';
import { loginDto } from 'src/dto/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('signup')
    async signUp(@Body()payload:signupDto){
        return await this.authService.signUp(payload)
    }


    @Post('login')
    async login(@Body()payload:loginDto, @Res()res:Response){

     
            return await this.authService.signIn(payload, res);
        // res.cookie('isAuthenticated', true, {maxAge: 2 * 60 * 60 * 100});
        // res.cookie('User isAuthenticated', token, {
        //     httpOnly: true,
        //     maxAge: 1 * 60 * 60 * 24
        // });
        // return res.send({
        //     statusCode: 201,
        //     success: true,
        //     userToken: token
        
        // })           
}
    @Post('logout')
    async logout(@Req()req:Request, @Res()res:Response){
        return await this.authService.logout(req,res)
    }
}
