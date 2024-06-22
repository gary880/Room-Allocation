'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CustomInputNumber from './CustomInputNumber';
import { getDefaultRoomAllocation } from '@/utils/getDefaultRoomAllocation';
import { Guest, Room, Allocation } from '@/types/allocation';
import { getTotalPrice } from '@/utils/getTotalPrice';

interface RoomAllocationProps {
    guest: Guest;
    rooms: Room[];
    onChange: (result: Guest[]) => void;
}

const RoomAllocation: React.FC<RoomAllocationProps> = ({ guest, rooms, onChange }) => {
    const [allocations, setAllocations] = useState<Allocation[]>(()=>getDefaultRoomAllocation(guest, rooms));
    const [allocateGuest, setAllocateGuest] = useState<Guest>({ adult: 0, child: 0 });

    const handleAllocationChange = useCallback((index: number, type: 'adult' | 'child', value: number) => {
        setAllocations(prevAllocations => {
            const newAllocations = [...prevAllocations];
            newAllocations[index] = { ...newAllocations[index], [type]: value };

            // Calculate the price
            newAllocations[index].price = rooms[index].roomPrice +
                (newAllocations[index].adult * rooms[index].adultPrice) +
                (newAllocations[index].child * rooms[index].childPrice);

            // Calculate the total number of allocated adults and children
            const totalAdults = newAllocations.reduce((sum, allocation) => sum + allocation.adult, 0);
            const totalChildren = newAllocations.reduce((sum, allocation) => sum + allocation.child, 0);

            // Update unallocated guests
            setAllocateGuest({ adult: guest.adult - totalAdults, child: guest.child - totalChildren });

            return newAllocations;
        });
    }, [guest, rooms]);

   
    useEffect(() => {
        onChange(allocations.map(({ adult, child }) => ({ adult, child })))
    }, [allocations,onChange]);

    return (
        <div className="w-96 flex flex-col gap-4 mt-2">
            <div className='p-3 bg-sky-50 border border-sky-300 rounded-md text-gray-500 font-semibold'>
                尚未分配人數：{allocateGuest.adult}位大人，{allocateGuest.child}位小孩
            </div>
            {allocations.map((allocation, index) => (
                <div key={index} >
                    <span>房間 {allocation.adult + allocation.child} 人</span>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col'>
                            <span >大人</span>
                            <span className='text-gray-400'>年齡20+</span>
                        </div>
                        <CustomInputNumber
                            min={1}
                            max={Math.min(allocations[index].capacity - allocation.child, allocateGuest.adult + allocation.adult)}
                            step={1}
                            name={`room-${index}-adult`}
                            value={allocation.adult}
                            onChange={(e) => handleAllocationChange(index, 'adult', Number(e.target.value))}
                            onBlur={(e) => console.log(e.target.name)}
                        />
                    </div>
                    <div className='flex justify-between items-center'>
                        <span >小孩</span>
                        <CustomInputNumber
                            min={0}
                            max={Math.min(allocations[index].capacity - allocation.adult, allocateGuest.child + allocation.child)}
                            step={1}
                            name={`room-${index}-child`}
                            value={allocation.child}
                            onChange={(e) => handleAllocationChange(index, 'child', Number(e.target.value))}
                            onBlur={(e) => console.log(e.target.name)}
                        />
                    </div>
                    <hr className="mt-2" />
                </div>
            ))}
            <p className='font-bold text-xl text-sky-400 text-end'>總價格: {getTotalPrice(allocations)}</p>
        </div>
    );
}

export default RoomAllocation;
