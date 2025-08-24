import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('v1');

  // Swagger/OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle('Viral Content Machine API')
    .setDescription('AI-powered viral content generation platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('campaigns', 'Campaign management')
    .addTag('angles', 'Content angles and hooks')
    .addTag('copy', 'Copy generation')
    .addTag('assets', 'Visual assets and images')
    .addTag('hashtags', 'Hashtag generation and management')
    .addTag('schedule', 'Posting schedule management')
    .addTag('exports', 'Export and integration endpoints')
    .addTag('analytics', 'Analytics and metrics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.GATEWAY_PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Gateway running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api`);
}

bootstrap();
