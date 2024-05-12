import { Injectable } from '@nestjs/common';
import { Employee } from './interfaces/employee.interface';

@Injectable()
export class EmployeesService {
    private readonly items: Employee[] = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Sarno',
            position: 'CEO',
            email: 'sarno@gmail.com',
            phone: '0123456789',
        },
        {
            id: '2',
            firstName: 'John',
            lastName: 'Smith',
            position: 'CTO',
            email: 'smith@gmail.com',
            phone: '0123456789',
        },
    ]

    findAll(): Employee[] {
        return this.items
    }
}
