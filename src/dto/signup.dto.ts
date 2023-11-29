import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class signupDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    lastName: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    middleName?: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'sorry you must put in 6 characters'})
    @MaxLength(16)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message: 'password must contain atleast One Uppercase, One number and One special key'})
    password: string;

}