'use client'; // C'est un component côté client

import { useState } from 'react';
import BookingDatePicker from './BookingDatePicker';

// Rendre la couleur personnalisable
interface BookingWidgetProps {
  primaryColor?: string;
}

export default function BookingWidget({ primaryColor = '#F85541' }: BookingWidgetProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [date, setDate] = useState<Date | null>(null); // pour reset la date s'il y a succès

  // simulation API
  const workshop = {
    title: "Initiation à l'aquarelle",
    image: '/image.jpg',
    location: 'Paris 11e',
    price: '45€',
  };

  const handleBooking = () => {
    if (!selectedSlot) return alert('Merci de sélectionner une date et une heure');
    setStatus('loading');
    setTimeout(() => {
      setStatus(Math.random() > 0.2 ? 'success' : 'error');
    }, 1200);
  };

  function resetBooking() {
    setSelectedSlot(null);
    setDate(null);
    setStatus('idle');
  }

  if (status === 'success') {
    return (
      <div
        className="w-full max-w-sm rounded-2xl shadow-lg p-6 bg-white text-center space-y-4"
        style={{ borderColor: primaryColor, borderWidth: 2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">🎉 Réservé !</h2>
        <p className="text-gray-600">Votre créneau a bien été réservé.</p>

        <button
          className="w-full py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: primaryColor }}
          onClick={() => alert('Mock — aucune action')}
        >
          Ajouter à l’agenda
        </button>

        <button
          className="w-full py-2 rounded-lg border font-semibold text-gray-700"
          style={{ borderColor: primaryColor }}
          onClick={resetBooking}
        >
          Réserver un autre créneau
        </button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className="w-full max-w-sm rounded-2xl shadow-lg p-6 bg-white text-center space-y-4"
        style={{ borderColor: primaryColor, borderWidth: 2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Oups, une erreur s'est produite 😵‍💫</h2>

        <button
          className="w-full py-2 rounded-lg border font-semibold text-gray-700"
          style={{ borderColor: primaryColor }}
          onClick={resetBooking}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-sm rounded-2xl shadow-lg overflow-hidden bg-white"
      style={{ borderColor: '#000000', borderWidth: 1 }}
    >
      <div
        className={`relative transition-opacity duration-300 ${status === 'loading' ? 'opacity-30' : 'opacity-100'}`}
      >
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img src="/loader.png" alt="loading" className="w-20 h-20 animate-spin-slow" />
          </div>
        )}

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
            date={date}
            setDate={setDate}
          />

          <button
            onClick={handleBooking}
            disabled={status === 'loading'}
            className="w-full mt-4 py-2 text-white rounded-lg font-semibold"
            style={{ backgroundColor: primaryColor }}
          >
            {status === 'loading' ? 'Réservation en cours...' : 'Réserver'}
          </button>
        </div>
      </div>
    </div>
  );
}
