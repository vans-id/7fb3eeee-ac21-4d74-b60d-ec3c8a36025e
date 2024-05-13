import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
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

    async bulkUpdate(bulkUpdateDto: BulkUpdateDto[]): Promise<void> {
        const bulkOps = bulkUpdateDto.map((item) => {
            console.log(item)
            const updateData = { ...item };
            delete updateData._id;
        
            const filter = { _id: item._id ? new mongoose.Types.ObjectId(item._id) : undefined };
        
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
}
