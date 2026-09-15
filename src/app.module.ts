import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { productModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/.env.dev',
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.DB_HOST as string || 'mongodb://localhost:27017/nest', {
      serverSelectionTimeoutMS: 5000,
      onConnectionCreate(connection) {
        connection.on('connected', () => {
          console.log('Mongo DB Connected Successfuly');
        });
      },
    }),
    CategoryModule,
    productModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
