import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';
// import { Employee } from './interfaces/employee.interface';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService : EmployeesService) {}

    @Get()
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll()
    }

    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeesService.create(createEmployeeDto)
    }
    
    @Put(':id')
    update(@Param('id') id: string, @Body() updateEmplosyeeDto: CreateEmployeeDto) : Promise<Employee> {
        return this.employeesService.update(id, updateEmplosyeeDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) : Promise<Employee> {
        return this.employeesService.delete(id)
    }
}
