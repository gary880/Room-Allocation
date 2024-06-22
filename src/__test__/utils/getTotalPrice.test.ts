import { getTotalPrice } from "@/utils/getTotalPrice";
import { Allocation } from "@/types/allocation";


describe('getTotalPrice', () => {
    it('should return the total price of all allocations', () => {
        const allocations: Allocation[] = [
            { roomPrice: 150, adultPrice: 50, childPrice: 25, capacity: 4, adult: 2, child: 2, price: 100 },
            { roomPrice: 300, adultPrice: 75, childPrice: 35, capacity: 4, adult: 2, child: 2, price: 200 },
            { roomPrice: 450, adultPrice: 100, childPrice: 50, capacity: 4, adult: 2, child: 2, price: 300 },
        ];
        // price 100 + 200 + 300 = 600
        const totalPrice = getTotalPrice(allocations);

        expect(totalPrice).toBe(600);
    });

    it('should return 0 if the allocations array is empty', () => {
        const allocations: Allocation[] = [];

        const totalPrice = getTotalPrice(allocations);

        expect(totalPrice).toBe(0);
    });

    
});