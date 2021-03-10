export class userDTO {
    name: string;
    birth :string;
    email: string;
    phone: string;
    password: string;
    id: number;
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