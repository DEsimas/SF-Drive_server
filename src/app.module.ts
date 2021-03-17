import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RegistrationModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test', {
      autoCreate: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
