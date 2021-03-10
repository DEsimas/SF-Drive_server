export class inputUserDTO {
    name: string;
    birth :string;
    email: string;
    phone: string;
    password: string;
    passport: {
        name: string;
        who: string;
        date: string;
        code: string;
    };
    license: {
        name: string;
        date: string;
    };
};