
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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
    authentication(email?: string, password?: string): User | Promise<User>;
}
