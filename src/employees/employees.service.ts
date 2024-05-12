import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { Employee } from './interfaces/employee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';


@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) {}

    async findAll(sortBy: string): Promise<Employee[]> {
        try {
            const items = await this.employeeModel.find().sort(sortBy).exec();
            return items;
        } catch (error) {
            throw new BadRequestException('Failed to fetch items');
        }
    }
    // async findAll(): Promise<Employee[]> {
    //     return await this.employeeModel.find()
    // }

    async create(employee: CreateEmployeeDto): Promise<Employee> {
        try {
            const newEmployee = new this.employeeModel(employee)
            return await newEmployee.save()
          } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                throw new BadRequestException('Email must be unique', 'EmailNotUnique');
            } else {
                throw new InternalServerErrorException('Failed to add employee');
            }
        }
    }

    async update(id: string, employee: CreateEmployeeDto): Promise<Employee> {
        try {
            const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, employee);
            if (!updatedEmployee) {
                throw new NotFoundException();
            }
            return updatedEmployee;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('Invalid employee ID');
            } else if (error instanceof NotFoundException) {
                throw new NotFoundException('Employee not found');
            } else {
                throw new InternalServerErrorException('Failed to update employee');
            }
        }
    }

    async delete(id: string): Promise<Employee> {
        try {
            const updatedEmployee = await this.employeeModel.findByIdAndDelete(id);
            return updatedEmployee;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('Invalid employee ID');
            } else if (error instanceof NotFoundException) {
                throw new NotFoundException('Employee not found');
            } else {
                throw new InternalServerErrorException('Failed to update employee');
            }
        }
    }
}
