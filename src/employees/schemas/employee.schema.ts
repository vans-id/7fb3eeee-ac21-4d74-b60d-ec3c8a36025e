// import * as mongoose from 'mongoose';

// export const EmployeeSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     position: String,
//     phone: String,
//     email: String,
// })

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  position: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);