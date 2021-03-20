import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { inputUserDTO } from "./DTO/inputUser.dto";
import { userDTO } from "./DTO/user.dto";
import { userDocument, userSchema } from "./DTO/user.schema";
import { Model } from "mongoose";

const JSON_STRINGIFY_SPACES: number = 2;

@Injectable()
export class RegistrationService {

    constructor(@InjectModel('users') private readonly user: Model<userDocument>) {
    };

    formatOutput(data) {
        return JSON.stringify(data, undefined, JSON_STRINGIFY_SPACES);
    };

    async getAll() {
        console.log('\nAll users requested');
        return this.user.find();
    };

    async changePassword(email, password) {
        const user = await this.user.findOne({ email: email });
        if (user == null) {
            console.log("\nChange password. User not found.");
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        } else {
            await this.user.findOneAndUpdate({ email: email }, { $set: { password: password } });
            console.log(`\nUser:\n${user}\nPassword changed with: ${password}`);
            return user;
        };
    };

    async getById(id: number) {
        const user = await this.user.findOne({ id: id });
        if (user === null) {
            console.log(`\nRequested user with id ${id}. USER NOT FOUND!`);
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
            console.log(`\nRequested user\n${this.formatOutput(user)}`);
            return user;
        };
    };

    async auth(email: string, password: string) {
        const user = await this.user.findOne({ email: email });
        if (user == null) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        else {
            if (user.password != password) throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
            else {
                console.log(`\nAuthorized:\n${this.formatOutput(user)}`);
                return user;
            }
        };
    };

    async addUser(data: inputUserDTO) {
        if (await this.user.findOne({ email: data.email }) == null) {
            const newUser: userDTO = {
                ...data,
                id: Date.now(),
            };
            console.log(`\nAdded new user\n${this.formatOutput(newUser)}`);
            const us = new this.user(newUser);
            return us.save();
        } else {
            console.log(`\nUser:\n ${this.formatOutput(data)}\nAlready exists`);
            throw new HttpException('User aleready exists', HttpStatus.NO_CONTENT);
        };
    };

    async updateUser(id: number, data: any) {
        if (await this.user.findOne({ id: id }) == null) {
            console.log("\nUpdate user. User not found.");
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        } else {
            const keys = Object.keys(data);
            for (let key of keys) {
                const obj = {};
                obj[key] = data[key];
                await this.user.findOneAndUpdate({ id: id }, { $set: obj });
                const user = await this.user.find({ id: id });
                console.log(`\nuser updated\n${this.formatOutput(user)}\nwith:\n${this.formatOutput(data)}`);
                return user;
            };
        };
    };

    async removeUser(id: number) {
        if (await this.user.findOne({ id: id }) == null) {
            console.log("\nDelete user. User not found.");
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const user = await this.user.findOne({ id: id });
        await this.user.deleteOne({ id: id });
        console.log(`\nDeleted one user\n${this.formatOutput(user)}`);
        return user;
    }
};