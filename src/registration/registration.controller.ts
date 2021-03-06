import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
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
    getOne(@Param('id') id: string) {
        return this.RegistrationService.getById(id);
    };

    @Post('/auth')
    auth(@Body() data: {email: string, password: string}) {
        return this.RegistrationService.auth(data.email, data.password);
    };

    @Post()
    @HttpCode(201)
    addUser(@Body() data){
        return this.RegistrationService.addUser(data);
    };

    @Post(':email')
    @HttpCode(201)
    changePasswrd(@Param('email') email: string, @Body() data: any){
        return this.RegistrationService.changePassword(email, data.password);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() data: any){
        return this.RegistrationService.updateUser(id, data);
    };

    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.RegistrationService.removeUser(id);
    };
};