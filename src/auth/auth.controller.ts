import { Body, Controller, Post } from '@nestjs/common';
import { signupDto } from '../dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post()
    async signUp(@Body()payload:signupDto){
        return await this.authService.signUp(payload)
    }
}
