import { Injectable } from "@nestjs/common";
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

    private users: Array<any> = [{  
        name : "Сухарев Серафим Павлович",
        birth : "2004-10-26",
        email : "simasuh@gmail.com",
        phone : "+7 977 722 85 82",
        password : "9876543",
        passport : {
            name : "1234 567890",
            date : "2001-01-01",
            who : "Министерство наливания молока",
            code : "123-456"
        },
        license : {
            name : "0987 654321",
            date : "2012-12-12"
        },
        id: 1,
    }];

    formatOutput(data){
        return JSON.stringify(data, undefined, JSON_STRINGIFY_SPACES);
    }

    async getAll() {
        console.log('\nall users requested');
        return this.user.find();
        // return this.users;
    };

    validate(email, password) {
        const res = this.users.find(value => value.email == email);
        console.log("authorized", this.formatOutput(res));

        if(res == undefined) return {message: "user not found"};

        if(res.password == password) return {id: res.id};
        else return {message: "user not found"};
    }

    getById(id: number) {
        const res = this.users.find(value => value.id == id);
        console.log(`\nrequested user\n${this.formatOutput(res)}}`);
        return res;
    };

    async addUser(data: inputUserDTO) {
        const newUser: userDTO = {
            ...data,
            id: Date.now(),
        };

        //some validation

        console.log(`\nadded new user\n${this.formatOutput(newUser)}`);

        const us = new this.user(newUser);
        return us.save();

        // this.users.push(user);
        // return user;
    };

    updateUser(id: number, data: any){
        // let num = undefined;
        // this.users.map((element, index) => {
        //     if(element.id == id) num = index;
        // });

        // if(num === undefined) return {message: "user not found"};

        this.user.findOneAndUpdate({id: id}, {$set:{password: data.password}});

        // Object.keys(data).forEach(key => {
        //     this.user.findOneAndUpdate({id: id}, {$set:{key: data[key]}});
        // });

        console.log(`\nuser updated\n${this.formatOutput(this.user.find({id: id}))}\nwith:\n${this.formatOutput(data)}`);
        // return this.users[num];
    };

    removeUser(id: number){
        let num = undefined;
        this.users.map((element, index) => {
            if(element.id == id) num = index;
        });

        if(num === undefined) return {message: "user not found"};
        
        console.log(`\nuser removed\n${this.formatOutput(this.users[num])}`);
        this.users[num] = undefined;

        return {message: "success"};
    }
};