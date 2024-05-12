import { Injectable } from '@nestjs/common';
// import { Employee } from './interfaces/employee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';


@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) {}
    // constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>) {}

    findAll(): Promise<Employee[]> {
        return this.employeeModel.find()
    }

    create(employee: CreateEmployeeDto): Promise<Employee> {
        const newEmployee = new this.employeeModel(employee)
        return newEmployee.save()
    }

    update(id: string, employee: CreateEmployeeDto): Promise<Employee> {
        return this.employeeModel.findByIdAndUpdate(id, employee, {new: true})
    }

    delete(id: string): Promise<Employee> {
        return this.employeeModel.findByIdAndDelete(id)
    }
}
