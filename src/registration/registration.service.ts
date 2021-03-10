import { Injectable } from "@nestjs/common";
import { inputUserDTO } from "./DTO/inputUser.dto";
import { userDTO } from "./DTO/user.dto";

const JSON_STRINGIFY_SPACES: number = 2;

@Injectable()
export class RegistrationService {
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

    getAll() {
        console.log('\nall users requested');
        return this.users;
    };

    getById(id: number) {
        const res = this.users.find(value => value.id == id);
        console.log(`\nrequested user\n${this.formatOutput(res)}}`);
        return res;
    };

    addUser(data: inputUserDTO) {
        const user: userDTO = {
            ...data,
            id: Date.now(),
        };
        console.log(`\nadded new user\n${this.formatOutput(user)}`);
        this.users.push(user);
        return user;
    };

    updateUser(id: number, data: any){
        let num = undefined;
        this.users.map((element, index) => {
            if(element.id == id) num = index;
        });

        if(num === undefined) return {message: "user not found"};

        Object.keys(data).forEach(key => {
            this.users[num] = {
              ...this.users[num],
              [key]: data[key],
            }
        });

        console.log(`\nuser updated\n${this.formatOutput(this.users[num])}\nwith:\n${this.formatOutput(data)}`);
        return this.users[num];
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