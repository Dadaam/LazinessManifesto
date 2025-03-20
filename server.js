const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale redirige vers index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour la page du calculateur
app.get('/calculateur', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calculateur.html'));
});

// Route pour générer le QR Code (à utiliser en externe)
app.get('/qrcode', (req, res) => {
    // Cette route est uniquement utilisée pour montrer comment générer le QR code
    // En production, vous devriez générer le QR code en dehors du site
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Générateur de QR Code | Manifeste de la Paresse</title>
            <script src="https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js"></script>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem;
                }
                h1 {
                    margin-bottom: 2rem;
                }
                #qrcode {
                    margin: 2rem 0;
                }
                p {
                    max-width: 600px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1>QR Code pour le Manifeste de la Paresse</h1>
            <p>Ce QR code dirige vers l'URL de votre application. Vous pouvez l'imprimer et le placer sur des flyers ou affiches.</p>
            <div id="qrcode"></div>
            <p><strong>Note :</strong> Ce QR code ne doit pas être affiché sur le site lui-même, mais placé en dehors, comme indiqué dans les spécifications.</p>
            
            <script>
                // Générer le QR code pointant vers l'URL de l'application
                const url = window.location.origin;
                QRCode.toCanvas(document.getElementById('qrcode'), url, {
                    width: 300,
                    margin: 2,
                    color: {
                        dark: '#1a1a1a',
                        light: '#f8f0e3'
                    }
                }, function (error) {
                    if (error) console.error(error);
                });
            </script>
        </body>
        </html>
    `);
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur du Manifeste de la Paresse démarré sur http://localhost:${port}`);
});
