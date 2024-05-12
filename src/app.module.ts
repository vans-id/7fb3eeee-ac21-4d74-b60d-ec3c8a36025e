import { Module } from '@nestjs/common';
import { EmployeesController } from './employees/employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import config from './config/keys';

@Module({
  imports: [EmployeesModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [EmployeesController],
  providers: [],
})
export class AppModule {}
