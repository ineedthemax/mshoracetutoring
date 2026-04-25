"use client";
import { useState } from "react";
import { mockAvailability } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Slot = { day: string; time: string };

export default function AvailabilityPage() {
  const [active, setActive] = useState<Slot[]>(
    mockAvailability.flatMap((d) => d.slots.map((time) => ({ day: d.day, time })))
  );

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const times = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"];

  function toggle(day: string, time: string) {
    const exists = active.some((s) => s.day === day && s.time === time);
    setActive(exists ? active.filter((s) => !(s.day === day && s.time === time)) : [...active, { day, time }]);
  }

  function isActive(day: string, time: string) {
    return active.some((s) => s.day === day && s.time === time);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
          <p className="text-gray-500 text-sm mt-1">Click time slots to toggle availability. Purple = available.</p>
        </div>
        <Button onClick={() => alert("Availability saved! (Supabase sync coming soon)")}>Save Changes</Button>
      </div>

      <Card>
        <CardContent className="p-6 overflow-x-auto">
          <div className="grid" style={{ gridTemplateColumns: `100px repeat(${days.length}, 1fr)` }}>
            {/* Header row */}
            <div />
            {days.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 pb-3 uppercase tracking-wide">
                {day.slice(0, 3)}
              </div>
            ))}

            {/* Time rows */}
            {times.map((time) => (
              <>
                <div key={`label-${time}`} className="text-xs text-gray-400 flex items-center pr-3">{time}</div>
                {days.map((day) => (
                  <div key={`${day}-${time}`} className="p-1">
                    <button
                      onClick={() => toggle(day, time)}
                      className={cn(
                        "w-full h-8 rounded-lg text-xs font-medium transition-all",
                        isActive(day, time)
                          ? "bg-violet-600 text-white hover:bg-violet-700"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      )}
                    >
                      {isActive(day, time) ? "✓" : ""}
                    </button>
                  </div>
                ))}
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
