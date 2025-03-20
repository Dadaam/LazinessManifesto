// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCgVVcJp5kTNJxPD3kmdPHraE_gdC1LtSo",
    authDomain: "lazynessmanifesto.firebaseapp.com",
    projectId: "lazynessmanifesto",
    storageBucket: "lazynessmanifesto.firebasestorage.app",
    messagingSenderId: "263515624145",
    appId: "1:263515624145:web:103226b010c5efbca96bf0"
};

// Initialiser Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
} else {
    console.error("Firebase n'est pas chargé correctement");
}
