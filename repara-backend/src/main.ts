import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.enableCors({ 
    origin: ['https://repara-front.vercel.app']
});
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
const port = process.env.PORT || 3001;
await app.listen(port);
}
bootstrap();