import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    position: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ unique: true, required: true })
    email: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);