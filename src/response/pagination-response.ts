export class PaginationResponse<T> {
    items: T[]
    totalItems: number
    totalPage: number
}