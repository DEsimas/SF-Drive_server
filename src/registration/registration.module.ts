import { Module } from "@nestjs/common";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";
import { RegistrationRepository } from "./repositories/registration.repository";
import { UserResolver } from './user/user.resolver';
import { MessagesGateway } from './messages.gateway';


@Module({
    providers: [RegistrationService, RegistrationRepository, UserResolver, MessagesGateway],
    controllers: [RegistrationController],
})
export class RegistrationModule {};