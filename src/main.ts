import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		transformOptions: {
			enableImplicitConversion: true,
		}
	}));

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	const config = new DocumentBuilder()
		.setTitle('SM Periferia - API')
		.setDescription('API to social media by Periferia.')
		.setVersion('1.0')
		.setExternalDoc('Swagger/ui.json', '/swagger/ui.json')
		.addBearerAuth()
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, documentFactory, {
		jsonDocumentUrl: 'swagger/ui.json',
		explorer: true,
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

	app.enableCors();

	const port = process.env.PORT || 3000;
	await app.listen(port);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
