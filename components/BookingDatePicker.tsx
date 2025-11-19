'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { fr } from 'date-fns/locale';

export default function BookingDatePicker() {
  // useState retourne un tableau [state, setter]
  // date -> contient une instance de Date ou undefined : c'est notre élément qui varie
  // setDate ->fonction pour mettre à jour date : c'est le setter de l'élément date
  //   par défaut, on la met en undefined (pas écrit ici car s'il n'y a rien c'est automatiquement undefined)
  const [date, setDate] = useState<Date | undefined>();

  // Faux planning
  const schedule = {
    monday: ['17:30', '20:00'],
    wednesday: ['13:00'],
    friday: ['18:30'],
  };

  // Fonction "est-ce qu'il y a un cours le [jour] ? Vrai/faux"
  function hasSchedule(d: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return Boolean(schedule[day as keyof typeof schedule]);
  }

  // Fonction "est-ce [jour] est déjà passé ? Vrai/faux"
  function hasPassed(d: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignore l’heure pour ne comparer que le jour

    const day = new Date(d);
    day.setHours(0, 0, 0, 0);
    return day < today;
  }

  // Fonction "est-ce que [jour] doit être grisé ?"
  function isDisabled(d: Date): boolean {
    return hasPassed(d) || !hasSchedule(d);
  }

  // Quand un utilisateur sélectionne une date
  function handleSelect(d: Date | undefined) {
    if (!d) return;
    if (!hasSchedule(d)) return; // On ignore les dates grisées
    setDate(d);
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
    </div>
  );
}
