import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginationResponse } from 'src/response/pagination-response';
import { BulkUpdateDto } from './dto/bulk-update.dto';


@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) {}

    async findAll(sortOptions: any, page: number, perPage: number): Promise<PaginationResponse<Employee>> {
        try {
            const items = await this.employeeModel.find()
                .sort(sortOptions)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
    
            const totalItems = await this.employeeModel.countDocuments().exec();
            const totalPage = Math.ceil(totalItems / perPage);
        
            return { items, totalItems, totalPage };
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch employees');
        }
    }

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

    async bulkUpdate(bulkUpdateDto: BulkUpdateDto[]): Promise<void> {
        const bulkOps = bulkUpdateDto.map((item) => {
            const updateData = { ...item };
            delete updateData._id;
        
            const filter = item._id ? { _id: new mongoose.Types.ObjectId(item._id) } : {};
        
            return {
              updateOne: {
                filter,
                update: updateData,
                upsert: true,
              },
            };
        });
      
        await this.employeeModel.bulkWrite(bulkOps)
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
