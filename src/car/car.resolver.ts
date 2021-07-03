import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CarsService } from 'src/cars/cars.service';

@Resolver()
export class CarResolver {
    constructor(private readonly carsService: CarsService) {}

    @Mutation()
    getFilterByName(@Args('name') name: string) {
        return this.carsService.getFilterByName(name);
    }
}
