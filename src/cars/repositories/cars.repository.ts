import { Injectable } from "@nestjs/common";
import { Cars } from "src/entities/car.entity";
import { getMongoRepository } from "typeorm";

@Injectable()
export class CarsRepository {

    constructor() {

    };

    async getRecommendations() {
        const repository = getMongoRepository(Cars);
        return repository.find();
    };

    async addCar(newCar) {
        const repository = getMongoRepository(Cars);
        return repository.save(newCar);
    }

}