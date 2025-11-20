# 🌼 Widget DaisyApp
Un widget permettant de réserver un créneau pour un atelier créatif, intégrable sur un site externe (type portfolio ou site d’artiste).

Essayez-le : https://daisy-project-five.vercel.app/

## 🛠️ Outils
- NextJS
- Tailwind CSS
- Vercel
- Shadcn UI
- Figma


## ✨ Features
- Affichage des infos principales de l'atelier
- Sélection d'un créneau selon la date et l'heure
- Responsive
- Couleur principale en tant que string
- Plusieurs états loading / vide / succès / erreur, user-friendly


##  🚂 Mon Processus
1. Création d'un premier squelette pour comprendre le fonctionnement de NextJS que je n'avais pas encore utilisé auparavant
2. Liste de toutes les features à implémenter, tri par difficulté et impact
3. Maquettage Figma rapide pour une meilleure idée du rendu
4. Travail sur le code (implémentation des features, travail sur le responsive et sur l'UI)
   1. Possible de réserver une date à l'aide d'un calendrier (les dates où il n'y a pas d'atelier ou déjà passées sont grisées)
   2. Créneaux dynamiques (changent selon le jour de la semaine)
   3. Responsive
   4. Places restantes dynamiques (changent selon une date)
   5. Travail sur l'UI et l'expérience utilisateur : changement du widget selon l'état (succès / erreur) et créations de boutons retry / ajouter à l'agenda
5. Launch sur Vercel
6. Écriture du readme