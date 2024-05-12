import { Controller, Get, Post, Put, Delete, Body, Param, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { EmployeesService } from './employees.service'
import { Employee } from './schemas/employee.schema'
import { SuccessResponse, AppResponseInterface } from 'src/response/app-response'
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { PaginationResponse } from 'src/response/pagination-response'
import { BulkUpdateDto } from './dto/bulk-update.dto'

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService : EmployeesService) {}

    @Get()
    @ApiOperation({ summary: 'Find All Employees' })
    @ApiQuery({ name: 'sortBy', required: false, type: 'string', description: 'Sort field' })
    @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
    @ApiQuery({ name: 'page', required: false, type: 'number', description: 'Page number' })
    @ApiQuery({ name: 'perPage', required: false, type: 'number', description: 'Items per page' })
    @ApiOkResponse({
        schema: {
          example: {
            data: {
                items: [
                    {
                        _id: "6640ad082a5e9cf27c06a4fd",
                        firstName: "john",
                        lastName: "smith",
                        position: "Janitor",
                        phone: "0123456789",
                        email: "smith@gmail.com",
                        __v: 0
                    },
                    {
                        _id: "6640ad082a5e9cf27c06a4fd",
                        firstName: "john",
                        lastName: "sarno",
                        position: "Security",
                        phone: "0123456789",
                        email: "sarno@gmail.com",
                        __v: 0
                    },
                ],
                "totalItems": 2,
                "totalPage": 1
            }
        }
        },
      })
    async findAll(
        @Query('sortBy', new DefaultValuePipe('firstName')) sortBy: string,
        @Query('sortOrder', new DefaultValuePipe('asc')) sortOrder: 'asc' | 'desc',
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
    ): Promise<AppResponseInterface<PaginationResponse<Employee>>> {
        const sortOptions: any = {}
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1
        const data = await this.employeesService.findAll(sortOptions, page, perPage)

        return new SuccessResponse(data)
    }

    @Post()
    @ApiOperation({ summary: 'Create a new employee' })
    @ApiBody({
        description: 'new data to add',
        schema: {
            example: {
                "firstName": "agung",
                "lastName": "sumber",
                "position": "security",
                "phone": "0123456789",
                "email": "agung@gmail.com",
            }
        },
    })
    @ApiOkResponse({
        description: 'Employee created successfully',
        schema: {
            example: {
                data: {
                    "firstName": "agung",
                    "lastName": "jaya",
                    "position": "security",
                    "phone": "0123456789",
                    "email": "agung@gmail.com",
                    "_id": "6640dbdf9c0c487fcc041e70",
                    "__v": 0
                }
            }
        }
    })
    async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<AppResponseInterface<Employee>> {
        const data = await this.employeesService.create(createEmployeeDto)
        return new SuccessResponse(data)
    }
    
    @Put()
    @ApiOperation({ summary: 'Update existing employees' })
    @ApiParam({ name: 'id', description: 'Employee ID' })
    @ApiBody({ 
        description: 'Updated data for the employee',
        schema: {
            example: [
                {
                    "id": "6640dbdf9c0c487fcc041e70",
                    "data": {
                        "firstName": "Agung",
                        "lastName": "Jaya",
                        "position": "security",
                        "phone": "0123456789",
                        "email": "agung@gmail.com"
                    }
                },
                {
                    "id": "6640ad082a5e9cf27c06a4fd",
                    "data": {
                        "firstName": "John",
                        "lastName": "Smith",
                        "position": "Janitor",
                        "phone": "0123456789",
                        "email": "sarno@gmail.com"
                    }
                }
            ]
        },
    })
    @ApiOkResponse({ 
        description: 'Employee updated successfully',
        schema: {
            example: {
                data: null
            }
        }
    })
    async bulkUpdate(@Body() bulkUpdateDto: BulkUpdateDto[]): Promise<AppResponseInterface<any>> {
        await this.employeesService.bulkUpdate(bulkUpdateDto)
        return new SuccessResponse(null)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an existing employee' })
    @ApiParam({ name: 'id', description: 'Employee ID' })
    @ApiOkResponse({ 
        description: 'Employee deleted successfully',
        schema: {
            example: {
                "_id": "6640ad082a5e9cf27c06a4fd",
                "firstName": "john",
                "lastName": "smithh",
                "position": "Janitor",
                "phone": "0123456789",
                "email": "sarno@gmail.com",
                "__v": 0
            }
        }
    })
    async delete(@Param('id') id: string) : Promise<AppResponseInterface<Employee>> {
        const data = await this.employeesService.delete(id)
        return new SuccessResponse(data)
    }
}
