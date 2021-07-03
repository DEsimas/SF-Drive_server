import { Injectable } from "@nestjs/common";
import { Cars } from "src/entities/car.entity";
import { getMongoRepository, getRepository, Like } from "typeorm";

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

    async getFilterByName(name: string) {

        console.log(name);

        const data = await getRepository(Cars).find({
            where: {
                name: Like(`%${name}%`),
            }
        });

        console.log(data);

        return data;
    }

}