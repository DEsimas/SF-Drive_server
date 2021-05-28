import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { getMongoManager, ObjectIdColumn } from "typeorm";
import { Users } from "./../entities/user.entity";
import { ObjectID } from "mongodb";
import { CarsRepository } from "./repositories/cars.repository";

const JSON_STRINGIFY_SPACES: number = 2;

@Injectable()
export class CarsService {

    constructor(private CarsRepository: CarsRepository) {
    };

    async getRecommendations() {
        let recommendations = [];
        const data = await this.CarsRepository.getRecommendations();
        while (recommendations.length != 12) {
            recommendations.push(data[recommendations.length]);
        }
        return recommendations;
    }

    async addCar(newCar){
        return await this.CarsRepository.addCar(newCar);
    }
};