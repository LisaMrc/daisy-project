'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const schedule = {
  monday: ['17:30', '20:00'],
  wednesday: ['13:00'],
  friday: ['18:30'],
};

export default function DateSelector() {
  const [date, setDate] = useState<Date | undefined>();
  const [slots, setSlots] = useState<string[]>([]);

  function handleSelect(d: Date | undefined) {
    setDate(d);

    if (!d) return;

    // Récupérer le jour de la semaine
    const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    // Trouver les créneaux
    const availableSlots = schedule[day as keyof typeof schedule] || [];

    setSlots(availableSlots);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Sélecteur de date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {date ? format(date, 'dd MMMM yyyy', { locale: fr }) : 'Choisir une date'}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Calendar mode="single" selected={date} onSelect={handleSelect} locale={fr} />
        </PopoverContent>
      </Popover>

      {/* Créneaux disponibles */}
      <div className="flex flex-wrap gap-2">
        {slots.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun créneau disponible pour cette date</p>
        ) : (
          slots.map((slot) => (
            <Button key={slot} variant="secondary">
              {slot}
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
