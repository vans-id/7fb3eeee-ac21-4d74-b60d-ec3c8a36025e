import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    position: string

    @IsNotEmpty()
    phone: string
    
    @IsEmail()
    email: string
}