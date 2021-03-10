import { Module } from "@nestjs/common";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";

@Module({
    providers: [RegistrationService],
    controllers: [RegistrationController],
})
export class RegistrationModule {};