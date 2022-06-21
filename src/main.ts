import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DispatchError } from './common/error/DispatchError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DispatchError());
  const options = new DocumentBuilder()
    .setTitle('User Session Tutorial')
    .setDescription('Basic Auth and session management')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
