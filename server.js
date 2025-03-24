const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, 'docs')));

// Route principale redirige vers index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Route pour la page du calculateur
app.get('/calculateur', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'calculateur.html'));
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur du Manifeste de la Paresse démarré sur http://localhost:${port}`);
});
