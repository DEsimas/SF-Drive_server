import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3000;
const URL = "http://localhost:4200";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: URL,
  });
  await app.listen(PORT);
  console.log(`server started on ${PORT}`);
}

//entery point
//  | 
//  |
// \ /
//  *

bootstrap();
