import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('Appointment-app example')
    .setDescription('The Appointment-app API description')
    .setVersion('1.0')
    .addTag('Appointment-app')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.PORT);
}
bootstrap();
