import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { getMongoManager } from "typeorm";
import { Users } from "./../entities/user.entity";

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
    };

    async changePassword(email, password) {
    };

    async getById(id: number) {
    };

    async auth(email: string, password: string) {
    };

    async addUser(data) {
        const newUser = new Users(data.name, data.birth, data.email, data.phone, data.password, data.license.name, data.license.date, data.passport.name, data.passport.date, data.passport.who, data.passport.code);
        const manager = getMongoManager();
        console.log("New user added:");
        console.log(newUser);
        return await manager.save(newUser);
    };

    async updateUser(id: number, data: any) {
    };

    async removeUser(id: number) {
    };
};