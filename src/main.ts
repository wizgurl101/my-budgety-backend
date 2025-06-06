import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('My Budgety API')
    .setDescription('The Budgety API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, documentFactory);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
