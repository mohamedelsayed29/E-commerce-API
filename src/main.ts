import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Safely parse port from environment with a fallback
  let port = Number(process.env.PORT);


  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
