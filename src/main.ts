import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const port = process.env.PROJECT_PORT;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5000'
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(port || 3000, ()=> console.log(port));
}
bootstrap();
