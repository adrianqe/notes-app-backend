import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://notes-app-frontend-zeta-two.vercel.app',
      'https://notes-app-frontend-mvn80doae-adrian-quiros-elizondos-projects.vercel.app',
      'https://notes-app-frontend-git-main-adrian-quiros-elizondos-projects.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
