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
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);

  const schedule = {
    monday: ['17:30', '20:00'],
    wednesday: ['13:00', '14:00', '21:00'],
    friday: ['18:30'],
  };

  //   Fonction qui imite ce que renverrai un serveur ou une API pour le nombre de places restantes
  async function fetchSpotsForDate(date: Date): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const day = date.toLocaleDateString('fr-FR');

        if (day === '21/11/2025') return resolve(2);
        if (day === '24/11/2025') return resolve(3);

        return resolve(6);
      }, 400);
    });
  }

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

  async function handleSelect(d: Date | undefined) {
    if (!d || isDisabled(d)) return;
    setDate(d);
    const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availableSlots = schedule[day as keyof typeof schedule] || [];
    setSlots(availableSlots);
    if (!availableSlots.includes(selectedSlot || '')) {
      setSelectedSlot(null);

      // 1. On récupère les créneaux
      const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const availableSlots = schedule[day as keyof typeof schedule] || [];
      setSlots(availableSlots);

      // 2. On simule l'appel API pour les places restantes
      const spots = await fetchSpotsForDate(d);
      setSpotsLeft(spots);
    }
  }

  // NB : ici les 3 fonctions peuvent être rassemblées en une seule,
  // mais j'ai décidé de les séparer pour un code plus flexible et lisible (single responsibility)

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

      {spotsLeft !== null && (
        <p className="text-sm text-gray-500 text-center">{spotsLeft} places restantes</p>
      )}
    </div>
  );
}
