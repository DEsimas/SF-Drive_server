import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    RegistrationModule,
    CarsModule,
    TypeOrmModule.forRoot({
      name: "default",
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "SF-DRIVE",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [__dirname + '/../**/*.entity.{js, ts}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
