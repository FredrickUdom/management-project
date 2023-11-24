import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PROJECT_PORT;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5000'
  });
  
  await app.listen(port || 3000, ()=> console.log(port));
}
bootstrap();
