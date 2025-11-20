'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { fr } from 'date-fns/locale';

interface BookingDatePickerProps {
  primaryColor: string;
  selectedSlot: string | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function BookingDatePicker({
  primaryColor,
  selectedSlot,
  setSelectedSlot,
}: BookingDatePickerProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [slots, setSlots] = useState<string[]>([]);

  const schedule = {
    monday: ['17:30', '20:00'],
    wednesday: ['13:00', '14:00', '21:00'],
    friday: ['18:30'],
  };

  function hasSchedule(d: Date): boolean {
    const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return Boolean(schedule[day as keyof typeof schedule]);
  }

  function hasPassed(d: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDay = new Date(d);
    checkDay.setHours(0, 0, 0, 0);
    return checkDay < today;
  }

  function isDisabled(d: Date): boolean {
    return hasPassed(d) || !hasSchedule(d);
  }

  function handleSelect(d: Date | undefined) {
    if (!d || isDisabled(d)) return;

    setDate(d);
    const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availableSlots = schedule[day as keyof typeof schedule] || [];
    setSlots(availableSlots);

    // Reset selectedSlot si le créneau précédent n'existe plus
    if (!availableSlots.includes(selectedSlot || '')) {
      setSelectedSlot(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {date ? date.toLocaleDateString('fr-FR') : 'Choisir une date'}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            locale={fr}
            modifiers={{
              disabledDay: (day) => isDisabled(day),
            }}
            modifiersClassNames={{
              disabledDay: 'text-gray-300 opacity-50 pointer-events-none',
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Boutons créneau dynamiques */}
      <div className="flex flex-wrap gap-2 mt-2">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot((prev) => (prev === slot ? null : slot))}
              className={`px-3 py-1 rounded-full border font-medium ${
                selectedSlot === slot ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: selectedSlot === slot ? primaryColor : 'transparent',
                borderColor: primaryColor,
              }}
            >
              {slot}
            </button>
          ))
        ) : (
          <p className="text-gray-500">Aucun créneau disponible</p>
        )}
      </div>
    </div>
  );
}
