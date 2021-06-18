import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Cars } from "src/entities/car.entity";
import { CarsService } from "./cars.service";

@Controller('cars')
export class CarsController {

    constructor(private readonly CarsService: CarsService){

    };

    @Get('/recommendations')
    getRecommendations(){
        return this.CarsService.getRecommendations();
    };

    @Post()
    addCar(@Body() data) {
        const newCar = new Cars(data.mark, data.model, data.year, data.number, data.VIN, data.color, data.engineType, data.volume, data.powerLS, data.powerKVT, data.transmission, data.mileage, data.PTS, data.STS, data.price, data.price3, data.price5, data.ownerID, data.OSAGO, data.KASKO);
        return this.CarsService.addCar(newCar);
    }
};