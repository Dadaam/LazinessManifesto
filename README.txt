# Manifeste de la Paresse

## Description

Le "Manifeste de la Paresse" est un site web interactif créé avec HTML, CSS et Node.js, qui propose un calculateur d'activités mesurées en "kronergies", une unité fictive. Ce projet vise à sensibiliser les utilisateurs à la réduction de leur consommation d'énergie quotidienne de manière ludique et pédagogique.

## Fonctionnalités

- Accès par QR Code
- Page d'accueil avec logo cliquable
- Calculateur d'activités organisé en trois catégories (Matin, Midi, Soir)
- Animations fluides pour l'affichage des listes d'activités
- Calcul automatique du total de kronergies
- Affichage du résultat avec animations dynamiques
- Message personnalisé basé sur la consommation en kronergies
- Jauge de comparaison à la moyenne des utilisateurs
- Stockage anonyme des données dans Firebase
- Design responsive adapté aux smartphones

## Prérequis

- Node.js (v12 ou supérieur)
- NPM (v6 ou supérieur)
- Un compte Firebase (pour la base de données)

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/votre-utilisateur/manifeste-paresse.git
   cd manifeste-paresse
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Configurez Firebase :
   - Créez un projet sur [Firebase](https://firebase.google.com/)
   - Créez une application web dans votre projet Firebase
   - Copiez les informations de configuration fournies par Firebase
   - Remplacez les valeurs dans `public/js/firebase-config.js` par vos propres informations

4. Démarrez l'application :
   ```
   npm start
   ```

5. Accédez à l'application dans votre navigateur à l'adresse `http://localhost:3000`

## Génération du QR Code

Pour générer un QR Code qui pointe vers votre application :

1. Démarrez l'application
2. Accédez à l'URL `http://localhost:3000/qrcode`
3. Un QR Code sera généré, que vous pouvez télécharger ou utiliser pour vos supports de communication

**Note** : Le QR Code ne doit pas être affiché sur le site lui-même, mais placé sur des supports externes comme des flyers, affiches, etc.

## Déploiement

Pour déployer cette application en production, vous pouvez utiliser des services comme :

- [Heroku](https://www.heroku.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

Assurez-vous d'ajuster la configuration Firebase pour votre environnement de production.

## Charte Graphique

- Palette de couleurs : beige (#f8f0e3), orange (#ff7f00), noir (#1a1a1a)
- Boutons et éléments avec coins arrondis
- Animations et transitions fluides
- Interface responsive adaptée aux différents appareils

## Licence

Ce projet est sous licence ISC. Voir le fichier `LICENSE` pour plus de détails.
