import { IsNotEmpty } from "class-validator"

export class BulkUpdateDto {
    @IsNotEmpty()
    id: string 
    @IsNotEmpty()
    data: object
}