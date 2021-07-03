
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    name: string;
    birth: string;
    email: string;
    phone: string;
    password: string;
    license: LicenseInput;
    passport: PassportInput;
}

export interface LicenseInput {
    name: string;
    date: string;
}

export interface PassportInput {
    name: string;
    date: string;
    who: string;
    code: string;
}

export interface UpdateUserInput {
    name?: string;
    birth?: string;
    email?: string;
    phone?: string;
    password?: string;
    license?: UpdateLicenseInput;
    passport?: UpdatePassportInput;
}

export interface UpdateLicenseInput {
    name?: string;
    date?: string;
}

export interface UpdatePassportInput {
    name?: string;
    date?: string;
    who?: string;
    code?: string;
}

export interface Car {
    _id: string;
    mark: string;
    model: string;
    year: number;
    number: string;
    VIN?: string;
    color?: string;
    engineType?: string;
    volume?: string;
    powerLS?: string;
    powerKVT?: string;
    transmission?: string;
    mileage?: string;
    PTS?: string;
    STS?: string;
    price: number;
    price3?: number;
    price5?: number;
    image: string;
    avatar: string;
    ownerID?: string;
    OSAGO?: string;
    KASKO?: string;
    name: string;
}

export interface IMutation {
    getFilterByName(name: string): Car[] | Promise<Car[]>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;
    deleteUser(id: string): User | Promise<User>;
}

export interface User {
    _id: string;
    name: string;
    birth: string;
    email: string;
    phone: string;
    password: string;
    license: License;
    passport: Passport;
}

export interface License {
    name: string;
    date: string;
}

export interface Passport {
    name: string;
    date: string;
    who: string;
    code: string;
}

export interface IQuery {
    findAllUsers(): User[] | Promise<User[]>;
    findOneUser(id: string): User | Promise<User>;
    authentication(email: string, password: string): User | Promise<User>;
}
