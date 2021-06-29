import { Args, Query, Resolver } from '@nestjs/graphql';
import { runInThisContext } from 'vm';
import { RegistrationService } from "./../registration.service";

@Resolver()
export class UserResolver {
    constructor(private readonly RegistrationService: RegistrationService){};

    @Query()
    findAllUsers() {
        return this.RegistrationService.getAll();
    };

    @Query()
    findOneUser(@Args('id') id: string) {
        return this.RegistrationService.getById(id);
    };

    @Query()
    authentication(@Args('email') email: string,@Args('password') password: string) {
        return this.RegistrationService.auth(email, password);
    };
}
