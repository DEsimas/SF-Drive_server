import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Users } from "./../entities/user.entity";
import { ObjectID } from "mongodb";
import { RegistrationRepository } from "./repositories/registration.repository";

const JSON_STRINGIFY_SPACES: number = 2;

@Injectable()
export class RegistrationService {

    constructor(private RegistrationRepository: RegistrationRepository) {
    };

    formatOutput(data) {
        return JSON.stringify(data, undefined, JSON_STRINGIFY_SPACES);
    };

    

    async getAll() {
        return await this.RegistrationRepository.getAll();
    };

    async changePassword(email, password) {
        const user = await this.RegistrationRepository.getOne({ email: email });
        console.log(user);
        if(user) {
            return this.updateUser( user._id.toString(), { password: password });
        } else {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    };

    async getById(id: string) {
        try {
            const _id = new ObjectID(id);
        } catch(e) {
            console.log(`Failed to get user ${id}. Wrong ID`);
            throw new HttpException("Wrong ID", HttpStatus.BAD_REQUEST);
        }
        const user = await this.RegistrationRepository.getOne({ _id: new ObjectID(id) });
        if(user) {
            console.log(`Got user ${id}`);
            return user;
        } else {
            console.log(`Failed to get user ${id}`);
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    };

    async auth(email: string, password: string) {
        const user = await this.RegistrationRepository.getOne( { email: email, password: password });
        if(user){
            console.log(`User authorized`);
            return user; 
        }
        else {
            console.log(`User "${email}" rejected with password "${password}"`);
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    };

    async addUser(data) {
        const newUser = new Users(data.name, data.birth, data.email, data.phone, data.password, data.license.name, data.license.date, data.passport.name, data.passport.date, data.passport.who, data.passport.code);
        try {
            if(await this.RegistrationRepository.exist({ email: newUser.email})) throw new Error("We aleready have this email");
            if(await this.RegistrationRepository.exist({ phone: newUser.phone })) throw new Error("We aleready have this phone");
            if(await this.RegistrationRepository.exist({ passport: newUser.passport })) throw new Error("We aleready have this passport");
            if(await this.RegistrationRepository.exist({ license: newUser.license })) throw new Error("We aleready have this license");
            if(newUser.password.length < 5) throw new Error("Weak password");
        }
        catch(e) {
            console.log("Failed to add new user");
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
        return await this.RegistrationRepository.saveUser(newUser);
    };

    async updateUser(id: string, data: any) {
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
        return await this.RegistrationRepository.saveUser(user);
    };

    async removeUser(id: string) {
        try {
            const _id = new ObjectID(id);
        } catch(e) {
            console.log(`Failed to delete user ${id}. Wrong ID`);
            throw new HttpException("Wrong ID", HttpStatus.BAD_REQUEST);
        }
        const _id = new ObjectID(id);
        if( !await this.RegistrationRepository.exist( { _id: _id} )) {
            console.log(`Failed to delete user ${_id}`);
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        else return await this.RegistrationRepository.deleteOne( { _id: _id });
    };
};