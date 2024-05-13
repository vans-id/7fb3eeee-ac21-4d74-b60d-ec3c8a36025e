import type { EmployeesResults } from "@/models/Employees"; 
import { EmployeesSchema } from "@/models/Employees";

export default async function fetchEmployees(url: string) : Promise<EmployeesResults | undefined> {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error("Cannot load employees")

        const results = await res.json()
        const parsedData = EmployeesSchema.parse(results)

        if (parsedData.data.totalItems === 0) return undefined
        return parsedData
    } catch (error) {
        console.log('error-->', error)
    }
}