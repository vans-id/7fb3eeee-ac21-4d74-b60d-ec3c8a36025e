import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schemas/employee.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Employee', schema: EmployeeSchema}])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
