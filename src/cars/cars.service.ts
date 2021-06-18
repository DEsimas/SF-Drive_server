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
        let ctr = data.length;
        while (recommendations.length != 12) {
            if(!data[recommendations.length]) break;
            recommendations.push({
                name: data[recommendations.length].mark + " " + data[recommendations.length].model + ", " + data[recommendations.length].year,
                price: data[recommendations.length].price,
                image: data[recommendations.length].image,
                avatar: data[recommendations.length].avatar,
                _id: data[recommendations.length]._id
            });
            ctr--;
        }
        return recommendations;
    }

    async addCar(newCar){
        return await this.CarsRepository.addCar(newCar);
    }
};