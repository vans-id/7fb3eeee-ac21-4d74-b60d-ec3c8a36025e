import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { EmployeesService } from './employees.service';
import { Employee } from './interfaces/employee.interface';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService : EmployeesService) {}

    @Get()
    findAll(): Employee[] {
        return this.employeesService.findAll()
    }

    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto): string {
        return `Name: ${createEmployeeDto.firstName}`
    }
    
    @Put(':id')
    update(@Param('id') id: string, @Body() updateEmplosyeeDto: CreateEmployeeDto) : string{
        return `updating ${id} - Name: ${updateEmplosyeeDto.firstName}`
    }

    @Delete(':id')
    delete(@Param('id') id: string) : string{
        return `deleting ${id}`
    }
}
