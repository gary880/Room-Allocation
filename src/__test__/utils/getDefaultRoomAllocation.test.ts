import { Guest,Room } from "@/types/allocation";
import { getDefaultRoomAllocation } from "@/utils/getDefaultRoomAllocation";

// guest 人數必定在所有 room 總和可容納人數內,且最少等於 room 數量。

describe('getDefaultRoomAllocation', () => {

    it('should allocate one room for one adult and one child', () => {
        const guest: Guest = { adult: 1, child: 1 };
        const rooms: Room[] = [
            { roomPrice: 100, adultPrice: 50, childPrice: 25, capacity: 2 },
        ];

        const allocations = getDefaultRoomAllocation(guest, rooms);

        expect(allocations).toEqual([
            { roomPrice: 100, adultPrice: 50, childPrice: 25, capacity: 2, adult: 1, child: 1, price: 175 }
        ]);
    });

    it('should allocate adults and children across multiple rooms based on priority and capacity', () => {
        const guest: Guest = { adult: 3, child: 2 };
        const rooms: Room[] = [
            { roomPrice: 200, adultPrice: 75, childPrice: 35, capacity: 3 },
            { roomPrice: 150, adultPrice: 50, childPrice: 25, capacity: 2 },
        ];
        // room 1: 1 adult 2 child
        // room 2: 2 adult 0 child
        const allocations = getDefaultRoomAllocation(guest, rooms);
        expect(allocations).toEqual([
            { roomPrice: 200, adultPrice: 75, childPrice: 35, capacity: 3, adult: 1, child: 2, price: 345 },
            { roomPrice: 150, adultPrice: 50, childPrice: 25, capacity: 2, adult: 2, child: 0, price: 250 },
        ]);
    });

    it('should allocate guests and children across rooms correctly for guest scenario 1', () => {
        const guest: Guest = { adult: 4, child: 2 };
        const rooms: Room[] = [
            { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
            { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
        ];
        // room 1: 3 adults, 1 children
        // room 2: 1 adults, 1 children
        const allocations = getDefaultRoomAllocation(guest, rooms);
        expect(allocations).toEqual([
            { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4, adult: 3, child: 1, price: 1700 },
            { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4, adult: 1, child: 1, price: 1000 },
        ]);
    });

});