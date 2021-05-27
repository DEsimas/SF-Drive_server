import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { getMongoManager, ObjectIdColumn } from "typeorm";
import { Users } from "../entities/users.entity";
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

    async exist(conditions: object) {
        const manager = getMongoManager();
        if(await manager.findOne(Users, conditions)) return true;
        else return false;
    };

    async getAll() {
        const manager = getMongoManager();
        console.log("All users requested");
        return await manager.find(Users);
    };

    async changePassword(email, password) {
        const manager = getMongoManager();
        const user = await manager.findOne(Users, { email: email });
        if(user) {
            return this.updateUser( user._id.toString(), { password: password });
        } else {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    };

    async getById(id: string) {
        const manager = getMongoManager();
        try {
            const _id = new ObjectID(id);
        } catch(e) {
            console.log(`Failed to get user ${id}. Wrong ID`);
            throw new HttpException("Wrong ID", HttpStatus.BAD_REQUEST);
        }
        const user = await manager.findOne(Users, { where: { _id: new ObjectID(id) } });
        if(user) {
            console.log(`Got user ${id}`);
            return user;
        } else {
            console.log(`Failed to get user ${id}`);
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    };

    async auth(email: string, password: string) {
        const manager = getMongoManager();
        const user = await manager.findOne(Users, { email: email, password: password });
        if(user){
            console.log(`User authorized`);
            console.log(user);
            return user; 
        }
        else {
            console.log(`User ${email} rejected with password ${password}`);
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    };

    async addUser(data) {
        const newUser = new Users(data.name, data.birth, data.email, data.phone, data.password, data.license.name, data.license.date, data.passport.name, data.passport.date, data.passport.who, data.passport.code);
        const manager = getMongoManager();
        try {
            if(await this.exist({ email: newUser.email})) throw new Error("We aleready have this email");
            if(await this.exist({ phone: newUser.phone })) throw new Error("We aleready have this phone");
            if(await this.exist({ passport: newUser.passport })) throw new Error("We aleready have this passport");
            if(await this.exist({ license: newUser.license })) throw new Error("We aleready have this license");
            if(newUser.password.length < 5) throw new Error("Weak password");
        }
        catch(e) {
            console.log("Failed to add new user");
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
        console.log("New user added:");
        console.log(newUser);
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
        await manager.deleteOne(Users, {where: { id: new ObjectID(id)}});
        return await manager.save(user);
    };

    async removeUser(id: string) {
        const manager = getMongoManager();
        try {
            const _id = new ObjectID(id);
        } catch(e) {
            console.log(`Failed to delete user ${id}. Wrong ID`);
            throw new HttpException("Wrong ID", HttpStatus.BAD_REQUEST);
        }
        const _id = new ObjectID(id);
        console.log(`User ${id} was deleted`);
        return await manager.delete(Users, { _id: _id });
    };
};