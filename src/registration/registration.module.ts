import { Module } from "@nestjs/common";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";
import { RegistrationRepository } from "./repositories/registration.repository";
import { UserResolver } from './user/user.resolver';

@Module({
    providers: [RegistrationService, RegistrationRepository, UserResolver],
    controllers: [RegistrationController],
})
export class RegistrationModule {};