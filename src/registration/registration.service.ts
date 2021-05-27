import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { getMongoManager, ObjectIdColumn } from "typeorm";
import { Users } from "./../entities/user.entity";
import { ObjectID } from "mongodb";

const JSON_STRINGIFY_SPACES: number = 2;

@Injectable()
export class RegistrationService {
    //throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    constructor() {
    };

    formatOutput(data) {
        return JSON.stringify(data, undefined, JSON_STRINGIFY_SPACES);
    };

    async getAll() {
        const manager = getMongoManager();
        console.log("All users requested");
        return await manager.find(Users);
    };

    async changePassword(email, password) {
    };

    async getById(id: string) {
        const manager = getMongoManager();
        try {
            const _id = new ObjectID(id);
        } catch(e) {
            console.log(`Failed to get user ${id}. Wrong ID`);
            throw new HttpException("Wrong ID", HttpStatus.BAD_REQUEST);
        }
        const user = await manager.findOne(Users, { _id: new ObjectID(id) });
        if(user) {
            console.log(`Got user ${id}`);
            return user;
        } else {
            console.log(`Failed to get user ${id}`);
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    };

    async auth(email: string, password: string) {
    };

    async addUser(data) {
        const newUser = new Users(data.name, data.birth, data.email, data.phone, data.password, data.license.name, data.license.date, data.passport.name, data.passport.date, data.passport.who, data.passport.code);
        const manager = getMongoManager();
        console.log("New user added:");
        console.log(newUser + '\n');
        return await manager.save(newUser);
    };

    async updateUser(id: string, data: any) {
        const manager = getMongoManager();
        let user = await this.getById(id);
        Object.keys(data).forEach(key => {
            let flag = false;
            Object.keys(user).forEach(_key => {
                if(_key == key) flag = true;
            });
            if(flag) user[key] = data[key];
            else delete data[key];
        });
        console.log(`User ${id} updated`);
        console.log(data);
        return await manager.save(user);
    };

    async removeUser(id: number) {
    };
};