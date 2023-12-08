import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions:{
          algorithm: configService.getOrThrow('JWT_ALGORITHM'),
          expiresIn: configService.getOrThrow<string>('JWT_EXPIRESIN')
        }
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
