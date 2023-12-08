import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class loginDto{

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message: 'password must conatain atleast One Uppercase, One number and One special key'})
    password: string;
}