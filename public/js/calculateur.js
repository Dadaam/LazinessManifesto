// Liste des activités par catégorie avec leurs valeurs en kronergies
const activites = {
    matin: [
        { nom: "Se lever", kronergies: 5 },
        { nom: "Prendre une douche", kronergies: 8 },
        { nom: "Petit-déjeuner", kronergies: 6 },
        { nom: "S'habiller", kronergies: 4 },
        { nom: "Brosser les dents", kronergies: 2 },
        { nom: "Méditer", kronergies: 3 },
        { nom: "Faire du sport matinal", kronergies: 15 },
        { nom: "Lire les actualités", kronergies: 5 },
        { nom: "Répondre aux emails", kronergies: 7 },
        { nom: "Planifier sa journée", kronergies: 4 },
        { nom: "Se maquiller", kronergies: 6 },
        { nom: "Préparer le déjeuner", kronergies: 8 }
    ],
    midi: [
        { nom: "Travail", kronergies: 20 },
        { nom: "Courses", kronergies: 10 },
        { nom: "Déjeuner", kronergies: 7 },
        { nom: "Appels professionnels", kronergies: 8 },
        { nom: "Réunion", kronergies: 12 },
        { nom: "Marcher", kronergies: 5 },
        { nom: "Faire la sieste", kronergies: 1 },
        { nom: "Consulter les réseaux sociaux", kronergies: 3 },
        { nom: "Discuter avec des collègues", kronergies: 5 },
        { nom: "Travailler sur un projet", kronergies: 15 },
        { nom: "Conduire", kronergies: 9 },
        { nom: "Résoudre un problème", kronergies: 14 }
    ],
    soir: [
        { nom: "Cuisine", kronergies: 15 },
        { nom: "Dîner", kronergies: 7 },
        { nom: "Écriture", kronergies: 5 },
        { nom: "Discussion", kronergies: 5 },
        { nom: "Sport", kronergies: 30 },
        { nom: "Regarder la télévision", kronergies: 2 },
        { nom: "Lire un livre", kronergies: 4 },
        { nom: "Faire le ménage", kronergies: 12 },
        { nom: "Prendre soin des enfants", kronergies: 20 },
        { nom: "Clignement des yeux", kronergies: 3 },
        { nom: "Se préparer pour dormir", kronergies: 4 },
        { nom: "Médias sociaux", kronergies: 6 },
        { nom: "Jouer à des jeux vidéo", kronergies: 8 }
    ]
};

// Moyenne fictive de kronergies pour la comparaison
let moyenneKronergies = 50;

// Variables pour stocker les éléments DOM
const matinBtn = document.getElementById('matin-btn');
const midiBtn = document.getElementById('midi-btn');
const soirBtn = document.getElementById('soir-btn');

const matinActivites = document.getElementById('matin-activites');
const midiActivites = document.getElementById('midi-activites');
const soirActivites = document.getElementById('soir-activites');

const calculerBtn = document.getElementById('calculer-btn');
const resultatContainer = document.getElementById('resultat-container');
const resultatTotal = document.getElementById('resultat-total');
const messagePersonnalise = document.getElementById('message-personnalise');
const jaugeBarre = document.getElementById('jauge-barre');
const jaugeMarqueur = document.getElementById('jauge-marqueur');
const moyenneValue = document.getElementById('moyenne-value');

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    // Générer les listes d'activités
    genererActivites('matin', matinActivites.querySelector('.activites-list'));
    genererActivites('midi', midiActivites.querySelector('.activites-list'));
    genererActivites('soir', soirActivites.querySelector('.activites-list'));
    
    // Ajouter les événements pour les boutons de catégories
    matinBtn.addEventListener('click', () => toggleCategorie(matinActivites, matinBtn));
    midiBtn.addEventListener('click', () => toggleCategorie(midiActivites, midiBtn));
    soirBtn.addEventListener('click', () => toggleCategorie(soirActivites, soirBtn));
    
    // Ajouter l'événement pour le bouton de calcul
    calculerBtn.addEventListener('click', calculerKronergies);
    
    // Récupérer la moyenne depuis Firebase
    getMoyenneFromFirebase();
});

// Fonction pour générer la liste des activités dans le DOM
function genererActivites(categorie, container) {
    activites[categorie].forEach((activite, index) => {
        const item = document.createElement('div');
        item.className = 'activite-item';
        item.dataset.kronergies = activite.kronergies;
        
        item.innerHTML = `
            <div class="activite-info">
                <span class="activite-nom">${activite.nom}</span>
                <span class="activite-kronergies">${activite.kronergies} kr</span>
            </div>
            <div class="activite-compteur">
                <button class="compteur-btn diminuer" data-categorie="${categorie}" data-index="${index}">-</button>
                <span class="compteur-value" id="${categorie}-${index}-value">0</span>
                <button class="compteur-btn augmenter" data-categorie="${categorie}" data-index="${index}">+</button>
            </div>
        `;
        
        container.appendChild(item);
    });
    
    // Ajouter les événements pour les boutons de compteur
    container.querySelectorAll('.compteur-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categorieId = this.dataset.categorie;
            const index = this.dataset.index;
            const valueElement = document.getElementById(`${categorieId}-${index}-value`);
            let value = parseInt(valueElement.textContent);
            
            if (this.classList.contains('diminuer')) {
                value = Math.max(0, value - 1);
            } else {
                value += 1;
            }
            
            valueElement.textContent = value;
        });
    });
}

// Fonction pour afficher/masquer une catégorie
function toggleCategorie(container, button) {
    const isVisible = container.style.display === 'block';
    
    // Masquer toutes les catégories et réinitialiser les boutons
    [matinActivites, midiActivites, soirActivites].forEach(cat => {
        cat.style.display = 'none';
    });
    
    [matinBtn, midiBtn, soirBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Afficher ou masquer la catégorie sélectionnée
    if (!isVisible) {
        container.style.display = 'block';
        button.classList.add('active');
    }
}

// Fonction pour calculer le total de kronergies
function calculerKronergies() {
    let total = 0;
    
    // Calculer pour chaque catégorie
    ['matin', 'midi', 'soir'].forEach(categorie => {
        const activitesElements = document.querySelectorAll(`#${categorie}-activites .activite-item`);
        
        activitesElements.forEach((item, index) => {
            const valueElement = document.getElementById(`${categorie}-${index}-value`);
            const count = parseInt(valueElement.textContent);
            const kronergies = parseInt(item.dataset.kronergies);
            
            total += count * kronergies;
        });
    });
    
    // Afficher le résultat
    afficherResultat(total);
    
    // Enregistrer le résultat dans Firebase
    enregistrerResultat(total);
}

// Fonction pour afficher le résultat
function afficherResultat(total) {
    // Mettre à jour le compteur
    resultatTotal.textContent = total;
    resultatTotal.classList.add('animate');
    
    // Afficher le conteneur de résultats s'il n'est pas déjà visible
    if (!resultatContainer.classList.contains('visible')) {
        resultatContainer.classList.add('visible');
    }
    
    // Générer un message personnalisé basé sur le total
    let message = "";
    if (total < 30) {
        message = `Vous avez dépensé ${total} kronergies aujourd'hui ! Félicitations, vous êtes un vrai champion de la paresse !`;
    } else if (total < 60) {
        message = `Vous avez dépensé ${total} kronergies aujourd'hui. Vous êtes dans la moyenne. Encore un peu d'effort pour être plus paresseux !`;
    } else if (total < 90) {
        message = `Vous avez dépensé ${total} kronergies aujourd'hui. C'est un peu trop ! Essayez de vous reposer davantage.`;
    } else {
        message = `Vous avez dépensé ${total} kronergies aujourd'hui ! C'est beaucoup trop, vous risquez l'épuisement. Adoptez la philosophie de la paresse !`;
    }
    
    messagePersonnalise.textContent = message;
    
    // Mettre à jour la jauge
    const pourcentage = Math.min(100, (total / 100) * 100);
    jaugeBarre.style.width = `${pourcentage}%`;
    
    // Mettre à jour le marqueur de moyenne
    jaugeMarqueur.style.left = `${(moyenneKronergies / 100) * 100}%`;
    moyenneValue.textContent = moyenneKronergies;
    
    // Réinitialiser l'animation après un court délai
    setTimeout(() => {
        resultatTotal.classList.remove('animate');
    }, 1000);
}

// Fonction pour récupérer la moyenne depuis Firebase
function getMoyenneFromFirebase() {
    // Assurez-vous que firebase est correctement initialisé
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        const db = firebase.firestore();
        
        db.collection('resultats').get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    let sum = 0;
                    let count = 0;
                    
                    snapshot.forEach((doc) => {
                        sum += doc.data().kronergies;
                        count++;
                    });
                    
                    if (count > 0) {
                        moyenneKronergies = Math.round(sum / count);
                        moyenneValue.textContent = moyenneKronergies;
                        jaugeMarqueur.style.left = `${(moyenneKronergies / 100) * 100}%`;
                    }
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de la moyenne:", error);
            });
    }
}

// Fonction pour enregistrer le résultat dans Firebase
function enregistrerResultat(total) {
    // Assurez-vous que firebase est correctement initialisé
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        const db = firebase.firestore();
        
        db.collection('resultats').add({
            kronergies: total,
            date: new Date()
        })
        .then(() => {
            console.log("Résultat enregistré avec succès !");
            // Mettre à jour la moyenne après l'enregistrement
            getMoyenneFromFirebase();
        })
        .catch((error) => {
            console.error("Erreur lors de l'enregistrement du résultat:", error);
        });
    }
}
