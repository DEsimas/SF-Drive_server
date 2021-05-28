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
        const newCar = new Cars(data.name, data.price, data.image, data.avatar);
        return this.CarsService.addCar(newCar);
    }
};