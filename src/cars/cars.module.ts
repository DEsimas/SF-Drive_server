import { Module } from "@nestjs/common";
import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.service";
import { CarsRepository } from "./repositories/cars.repository";

@Module({
    providers: [CarsService, CarsRepository],
    controllers: [CarsController],
})
export class CarsModule {};