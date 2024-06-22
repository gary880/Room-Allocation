import { Guest, Room, Allocation } from "@/types/allocation";

export function getDefaultRoomAllocation(guest: Guest, rooms: Room[]): Allocation[] {
    const { adult, child } = guest;

    const priorityRoomIndex  = rooms
        .map((room, index) => ({ index, adultPrice: room.adultPrice }))
        .sort((a, b) => a.adultPrice - b.adultPrice)
        .map(({ index }) => index);

    // Initialize allocations with the default values
    let allocations: Allocation[] = rooms.map(room => ({
        ...room,
        adult: 0,
        child: 0,
        price: room.roomPrice
    }));

    let remainingAdults = adult;
    let remainingChildren = child;

    // Ensure at least one adult per room in the order of priorityFill
    priorityRoomIndex.forEach(index => {
        if (remainingAdults > 0) {
            allocations[index].adult = 1;
            remainingAdults -= 1;
            allocations[index].price += allocations[index].adultPrice;
        }
    });

    // Allocate remaining adults and children to rooms with available capacity in the order of priorityFill
    priorityRoomIndex.forEach(index => {
        if (remainingAdults > 0 || remainingChildren > 0) {
            let room = allocations[index];
            let availableCapacity = room.capacity - room.adult - room.child;
            let adultsToAllocate = Math.min(remainingAdults, availableCapacity);
            room.adult += adultsToAllocate;
            remainingAdults -= adultsToAllocate;

            availableCapacity -= adultsToAllocate;

            let childrenToAllocate = Math.min(remainingChildren, availableCapacity);
            room.child += childrenToAllocate;
            remainingChildren -= childrenToAllocate;

            room.price += (adultsToAllocate * room.adultPrice) + (childrenToAllocate * room.childPrice);
        }
    });

    return allocations;
}
