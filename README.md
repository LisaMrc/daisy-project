# 🌼 Widget DaisyApp
Un widget permettant de réserver un créneau pour un atelier créatif, intégrable sur un site externe (type portfolio ou site d’artiste). Facile d'utilisation (user-friendly), facile à customiser, permet de réserver des créneaux en avance.

Essayez-le ici : https://daisy-project-five.vercel.app/


## 🛠️ Outils
- NextJS
- Tailwind CSS
- Vercel
- Shadcn UI
- Figma


## ✨ Features
- Affichage des informations principales de l'atelier (prix, lieu, ...)
- Sélection d'un créneau selon la date et l'heure à l'aide d'un calendrier en popup
- Responsive, spécialement sur petit écran
- Couleur principale facilement modifiable (personnalisation)
- Plusieurs états : loading / vide / succès / erreur, user-friendly
- Imite le rendu d'une API (backend mocké). 
  - **NB :** *L'API "échoue" environ 1 fois sur 5 : c'est juste pour montrer l'écran d'erreur*


## 🎯 Objectifs
### Pour le projet :
- Répondre à des contraintes visuelles, techniques et horaires (1 semaine maximum)
- Avoir un widget facile à utiliser (informations claires, immédiatement compréhensible)
- Pouvoir planifier des créneaux en avance (d'où le choix du calendrier)
- Éviter les erreurs de manipulation (larges boutons, jours déjà passés grisés et non sélectionnables)
- Avoir un bouton "ajouter à l'agenda" pour éviter les oublis
- S'adapter à plusieurs contraintes côté enseignant : possibilité d'avoir plusieurs cours par semaine, avec des créneaux et places différentes. Gestion automatique des données
- (Bonus :) jouer avec la DA de DaisyApp

### Côté technique
- Se former à NextJS
- Se former à Tailwind
- Se former à ShadcnUI
- S'exercer au responsive mobile (mobile-first)
- S'exercer à l'UX design : comment faire pour que toutes ces informations tiennent dans un tout petit rectangle sans que ce soit fouillis ?


##  🚂 Mon Processus
1. Création d'un premier squelette pour comprendre le fonctionnement de NextJS et Tailwind CSS (que je n'avais pas encore utilisé)
2. Liste de toutes les features à implémenter, tri par difficulté et impact
3. Maquettage Figma rapide pour une meilleure idée du rendu visé
4. Travail sur le code (implémentation des features, travail sur le responsive et sur l'UI)
   1. Possible de réserver une date à l'aide d'un calendrier (les dates où il n'y a pas d'atelier ou déjà passées sont grisées)
   2. Créneaux dynamiques (changent selon le jour de la semaine)
   3. Responsive
   4. Places restantes dynamiques (changent selon une date)
   5. Travail sur l'UI et l'expérience utilisateur : changement du widget selon l'état (succès / erreur) et créations de boutons retry / ajouter à l'agenda
5. Launch sur Vercel
6. Écriture du readme, mise à jour des commentaires
7. Travail sur d'autres features plus secondaires
   1. Taille du widget fixe entre tous les écrans
   2. Récapitulatif de la réservation


##  🧱 Structure
- BookingDatePicker -> permet de gérer tout ce qui concerne le choix de date et d'horaire (calendrier)
- BookingWidget -> structure globale, éléments fixes