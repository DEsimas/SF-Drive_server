import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

export const list = ["mark", "model", "year", "number", "VIN", "color", "engineType", "volume", "powerLS", "powerKVT", "transmission", "mileage", "PTS", "STS", "price", "price3", "price5", "image", "avatar"];

@Entity()
export class Cars {

    constructor(mark, model, year, number, VIN, color, engineType, volume, powerLS, powerKVT, transmission, mileage, PTS, STS, price, price3, price5, ownerID, OSAGO, KASKO) {
        this.mark=mark;
        this.model=model;
        this.year=year;
        this.number=number;
        this.VIN=VIN;
        this.color=color;
        this.engineType=engineType;
        this.volume=volume;
        this.powerLS=powerLS;
        this.powerKVT=powerKVT;
        this.transmission=transmission;
        this.mileage=mileage;
        this.PTS=PTS;
        this.STS=STS;
        this.price=price;
        this.price3=price3;
        this.price5=price5;
        this.image="https://mir-da.ru/wp-content/uploads/2019/11/20152505120831.jpg";
        this.avatar="https://vid.alarabiya.net/images/2020/07/25/d32699ab-d737-4f46-b486-1d8b508ef849/d32699ab-d737-4f46-b486-1d8b508ef849.JPG?crop=1:1";
        this.ownerID=ownerID;
        this.OSAGO = OSAGO;
        this.KASKO = KASKO;
    }

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    mark: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    number: string;
    
    @Column()
    VIN: string;

    @Column()
    color: string;

    @Column()
    engineType: string;

    @Column()
    volume: string;

    @Column()
    powerLS: string;

    @Column()
    powerKVT: string;

    @Column()
    transmission: string;

    @Column()
    mileage: string;

    @Column()
    PTS: string;

    @Column()
    STS: string;

    @Column()
    price: number;

    @Column()
    price3: number;

    @Column()
    price5: number;

    @Column()
    image: string;

    @Column()
    avatar: string;

    @Column()
    ownerID : string;

    @Column()
    OSAGO: string;

    @Column()
    KASKO: string;
}