import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./DTO/user.schema";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name: 'users', schema: userSchema}])
    ],
    providers: [RegistrationService],
    controllers: [RegistrationController],
})
export class RegistrationModule {};