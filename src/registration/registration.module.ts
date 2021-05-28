import { Module } from "@nestjs/common";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";
import { RegistrationRepository } from "./repositories/registration.repository";

@Module({
    providers: [RegistrationService, RegistrationRepository],
    controllers: [RegistrationController],
})
export class RegistrationModule {};