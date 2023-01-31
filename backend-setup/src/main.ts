import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs with Postgres')
    .setVersion('1.0')
    .addTag('nest-postgres')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  const PORT = process.env.PORT || 3001;
  //const host = '0.0.0.0';
  await app.listen(PORT);
}
bootstrap();
