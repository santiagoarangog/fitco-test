import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigUtil } from './modules/utils/config.utils';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('FitCo Test • API')
    .setDescription('API REST para FitCo Test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  const configUtil = new ConfigUtil();
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Route for show documentation
  SwaggerModule.setup('doc', app, document);
  console.log('------------------ API Listening in PORT:', configUtil.port);
  await app.listen(configUtil.port);
}
bootstrap();
