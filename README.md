# FabLife - Gestion de Recettes de Cuisine

## Description

FabLife est une application API RESTful qui vous permet de gérer des recettes de cuisine simples. Vous pouvez créer, lire, mettre à jour et supprimer des ingrédients et des recettes.

## Fonctionnalités

- Gestion des ingrédients : Créer, lire, mettre à jour et supprimer des ingrédients.
- Gestion des recettes : Créer, lire, mettre à jour et supprimer des recettes.
- Stockage des données dans une base de données PostgreSQL.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et npm installés sur votre machine.
3. Installez les dépendances du projet en exécutant la commande suivante :
   ```bash
   npm install
   ```
4. Assurez-vous d'avoir une base de données PostgreSQL configurée et accessible.
5. Configurez les variables d'environnement dans le dossier `config` dans le dossier `src` en vous basant sur le fichier `typeorm.config.ts`. Spécifiez les informations de connexion à votre base de données PostgreSQL.
6. Lancez l'application en exécutant la commande suivante :
   ```bash
   npm run start:dev
   ```

## Utilisation avec Postman

1. Lancez l'application en suivant les étapes d'installation ci-dessus.
2. Ouvrez Postman ou tout autre outil similaire pour effectuer des requêtes HTTP.
3. Utilisez les requêtes HTTP de la collection pour interagir avec les différentes fonctionnalités de l'API :
   - Utilisez les requêtes pour gérer les ingrédients (créer, lire, mettre à jour, supprimer).
   - Utilisez les requêtes pour gérer les recettes (créer, lire, mettre à jour, supprimer) et rechercher des recettes par type de repas.
4. Assurez-vous de remplacer les paramètres de la requête avec les valeurs appropriées, le cas échéant.
5. Envoyez les requêtes HTTP et observez les réponses de l'API.

## Exemple d'utilisation

- Créer un nouvel ingrédient :
  - Endpoint : `POST /ingredient`
  - Corps de la requête :
    ```json
    {
      "name": "Farine",
      "aisle": "Boulangerie"
    }
    ```
- Obtenir toutes les recettes :
  - Endpoint : `GET /recipe`
