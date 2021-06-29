import { Injectable } from "@nestjs/common";
import { Users } from "src/entities/user.entity";
import { getMongoRepository } from "typeorm";

@Injectable()
export class RegistrationRepository {

    constructor() {

    };

    async exist(conditions: object) {
        const repository = getMongoRepository(Users);
        if(await repository.findOne(conditions)) return true;
        else return false;
    };

    async saveUser(user: Users) {
        const repository = getMongoRepository(Users);
        return await repository.save(user);
    };

    async getAll() {
        const repository = getMongoRepository(Users);
        console.log("All users requested");
        return await repository.find();
    }

    async getOne(conditions) {
        const repository = getMongoRepository(Users);
        console.log("One user ruquested");
        return await repository.findOne(conditions);
    };

    async deleteOne(conditions) {
        const repository = getMongoRepository(Users);
        console.log(`User was deleted`);
        return await repository.deleteOne(conditions);
    }


}