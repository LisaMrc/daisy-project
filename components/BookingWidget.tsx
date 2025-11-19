'use client'; // C'est un component côté client

import { useState } from 'react';
import BookingDatePicker from "./BookingDatePicker";

// Rendre la couleur personnalisable
interface BookingWidgetProps {
  primaryColor?: string;
}

export default function BookingWidget({ primaryColor = '#800080' }: BookingWidgetProps) {
  // les états
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // simulation API
  const workshop = {
    title: "Initiation à l'aquarelle",
    image: '/image.jpg',
    location: 'Paris 11e',
    date: 'Samedi 23 novembre',
    price: '45€',
    spotsLeft: 3,
    slots: ['14h', '16h30', '19h'],
  };

  const schedule = {
    monday: ['17:30', '20:00'],
    wednesday: ['13:00'],
    friday: ['18:30'],
  };

  const handleBooking = () => {
    if (!selectedSlot) return alert('Merci de choisir un créneau');
    setStatus('loading');
    setTimeout(() => {
      setStatus(Math.random() > 0.2 ? 'success' : 'error');
    }, 1200);
    // TODO: à verifier
  };

  return (
    <div
      className="w-full max-w-sm rounded-2xl shadow-lg overflow-hidden bg-white"
      style={{ borderColor: primaryColor, borderWidth: 2 }}
    >
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-600 text-center">
          Envie de se rencontrer ? Participez à mon atelier !
        </p>
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-48 object-cover rounded-md"
        />{' '}
        {/* J'imite comment les images sont positionnées sur le site de Daisyapp */}
        <h2 className="text-xl font-bold text-gray-900">{workshop.title}</h2>
        <p className="text-sm text-gray-600">{workshop.location}</p>
        <p className="text-sm text-gray-600">{workshop.date}</p>
        <p className="text-lg font-semibold text-gray-900">{workshop.price}</p>
        <BookingDatePicker />
        <p className="text-sm text-gray-500">{workshop.spotsLeft} places restantes</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {workshop.slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-3 py-1 rounded-full border ${
                selectedSlot === slot ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: selectedSlot === slot ? primaryColor : 'transparent',
                borderColor: primaryColor,
              }}
            >
              {slot}
            </button>
          ))}
        </div>
        <button
          onClick={handleBooking}
          disabled={status === 'loading'}
          className="w-full mt-4 py-2 text-white rounded-lg font-semibold"
          style={{ backgroundColor: primaryColor }}
        >
          {status === 'loading'
            ? 'Réservation...'
            : status === 'success'
              ? '✅ Réservé !'
              : status === 'error'
                ? '❌ Erreur, réessaie'
                : 'Réserver'}
        </button>
      </div>
    </div>
  );
}
