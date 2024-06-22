import { Allocation } from "@/types/allocation";


export function getTotalPrice(allocations: Allocation[]): number {
    return allocations.reduce((total, allocation) => total + allocation.price, 0);
}