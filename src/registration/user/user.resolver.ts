import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from 'src/entities/graphql';
import { RegistrationService } from "./../registration.service";
import { Users } from "./../../entities/user.entity";

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

    @Mutation()
    createUser(@Args('createUserInput') createUserInput: CreateUserInput){
        console.log(createUserInput);
        const newUser = new Users(createUserInput.name, createUserInput.birth, createUserInput.email, createUserInput.phone, createUserInput.password, createUserInput.license.name, createUserInput.license.date, createUserInput.passport.name, createUserInput.passport.who, createUserInput.passport.date, createUserInput.passport.code);
        return this.RegistrationService.addUser(newUser);
    }

    @Mutation()
    updateUser(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.RegistrationService.updateUser(id, updateUserInput);
    }
}
