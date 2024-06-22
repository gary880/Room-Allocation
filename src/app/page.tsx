"use client";
import RoomAllocation from "@/components/RoomAllocation";
import { Guest } from "@/types/allocation";

export default function Home() {
  const guest = { adult: 4, child: 2 }
  const rooms = [
  { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
  ]
  const handleChange = (result: Guest[]) => {
    console.log(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        <h2 className="w-full text-xl font-bold">
          住客人數：{guest.adult}位大人，{guest.child}位小孩 / {rooms.length}房
        </h2>
        <RoomAllocation guest={guest} rooms={rooms} onChange={handleChange} />
      </div>
    </main>
  );
}
