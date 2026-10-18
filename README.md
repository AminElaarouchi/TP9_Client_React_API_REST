# TP9 — Client React pour API REST

Client React de l'API bancaire réalisée au [TP8](https://github.com/AminElaarouchi/TP8_Spring_RestController). Il affiche les comptes et permet de les créer, modifier et supprimer.

## Démarrage

1. Démarrer le TP8 sur le port **8082** (`mvn spring-boot:run`).
2. Dans ce dossier, exécuter `npm install` puis `npm start`.
3. Ouvrir <http://localhost:3000>.

Le client utilise `/banque/comptes`, l'endpoint réel du TP8. Le proxy Vite transmet les appels `/banque` à `http://127.0.0.1:8082` pendant le développement et évite les erreurs CORS. L'URL de base peut être remplacée par la variable `VITE_API_BASE_URL` lors d'un déploiement distinct. Dans ce cas, configurer CORS sur le serveur.

## Structure

- `src/config.js` : URL de base centralisée.
- `src/api.js` : appels Axios GET, POST, PUT et DELETE.
- `src/components/CompteForm.jsx` : formulaire de création et de modification.
- `src/components/CompteList.jsx` : tableau des comptes et actions.
- `src/App.jsx` : assemblage, rafraîchissement et gestion des erreurs.

Le TP utilise Vite pour le serveur React, avec les mêmes commandes `npm start` et port `3000` que dans l'énoncé. Vérification : `npm run build`.
