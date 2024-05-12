import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException, UseFilters } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { EmployeesService } from './employees.service'
import { Employee } from './schemas/employee.schema'

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService : EmployeesService) {}

    @Get()
    async findAll(): Promise<Employee[]> {
        return await this.employeesService.findAll('')
    }

    @Post()
    async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return await this.employeesService.create(createEmployeeDto)
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateEmplosyeeDto: CreateEmployeeDto) : Promise<Employee> {
        return await this.employeesService.update(id, updateEmplosyeeDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) : Promise<Employee> {
        return this.employeesService.delete(id)
    }
}
