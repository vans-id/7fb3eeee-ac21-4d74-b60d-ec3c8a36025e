import {z} from 'zod'

const EmployeeSchema = z.object({
  _id: z.string(),
  firstName: z.string().min(3), 
  lastName: z.string().min(3),
  position: z.string(), 
  phone: z.string().min(10),
  email: z.string().email(),
})

const itemsSchema = z.array(EmployeeSchema);

export const EmployeesSchema = z.object({
  data: z.object({
    items: itemsSchema,
    totalItems: z.number().int().positive(),
    totalPage: z.number().int().positive(),
  })
});

export type EmployeesResults = z.infer<typeof EmployeesSchema>

export type Employee = z.infer<typeof EmployeeSchema>