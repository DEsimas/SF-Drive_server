import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { inputUserDTO } from "./DTO/inputUser.dto";
import { RegistrationService } from "./registration.service";

@Controller('registration')
export class RegistrationController {

    constructor(private readonly RegistrationService: RegistrationService){

    };

    @Get()
    getAll(){
        return this.RegistrationService.getAll();
    };

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.RegistrationService.getById(id);
    };

    @Post()
    addUser(@Body() data: inputUserDTO){
        return this.RegistrationService.addUser(data);
    };

    @Post(':email')
    validate(@Param('email') email: string, @Body() data: any){
        console.log(data.password);
        return this.RegistrationService.validate(email, data.password);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() data: any){
        return this.RegistrationService.updateUser(id, data);
    };

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        return this.RegistrationService.removeUser(id);
    };
};