import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type userDocument = schema & Document;

class passport {
    name: string;
    who: string;
    date: string;
    code: string;
};

class license {
    name: string;
    date: string;
}

@Schema()
export class schema {
    @Prop()
    name: string;

    @Prop()
    birth :string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    password: string;

    @Prop()
    id: number;

    @Prop()
    passport: passport;

    @Prop()
    licence: license;
};

export const userSchema = SchemaFactory.createForClass(schema);