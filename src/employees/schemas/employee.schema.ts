import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    position: String,
    phone: String,
    email: String,
})