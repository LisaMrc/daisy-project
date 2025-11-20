'use client'; // C'est un component côté client

import { useState } from 'react';
import BookingDatePicker from './BookingDatePicker';

// Rendre la couleur personnalisable
interface BookingWidgetProps {
  primaryColor?: string;
}

export default function BookingWidget({ primaryColor = '#800080' }: BookingWidgetProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // simulation API
  const workshop = {
    title: "Initiation à l'aquarelle",
    image: '/image.jpg',
    location: 'Paris 11e',
    price: '45€',
    spotsLeft: 3,
  };

  const handleBooking = () => {
    if (!selectedSlot) return alert('Merci de choisir un créneau');
    setStatus('loading');
    setTimeout(() => {
      setStatus(Math.random() > 0.2 ? 'success' : 'error');
    }, 1200);
  };

  return (
    <div
      className="w-full max-w-sm rounded-2xl shadow-lg overflow-hidden bg-white"
      style={{ borderColor: primaryColor, borderWidth: 2 }}
    >
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-600 text-center hide-on-short">
          Envie de se rencontrer ? Participez à mon atelier !
        </p>
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-md hide-on-short"
          // J'imite comment les images sont stylisées sur le site de DaisyApp
        />

        <h2 className="text-xl font-bold text-gray-900">{workshop.title}</h2>
        <p className="text-sm text-gray-600">{workshop.location}</p>
        <p className="text-lg font-semibold text-gray-900">{workshop.price}</p>

        <BookingDatePicker
          primaryColor={primaryColor}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />

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
