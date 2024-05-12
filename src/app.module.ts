import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesController } from './employees/employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import config from './config/keys';

@Module({
  imports: [EmployeesModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController, EmployeesController],
  providers: [AppService],
})
export class AppModule {}
