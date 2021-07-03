import { Module } from "@nestjs/common";
import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.service";
import { CarsRepository } from "./repositories/cars.repository";
import { CarResolver } from './../car/car.resolver';


@Module({
    providers: [CarsService, CarsRepository, CarResolver],
    controllers: [CarsController],
})
export class CarsModule {};