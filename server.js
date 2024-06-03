const express = require('express');
const app = express();
const path = require('path');


const businessHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('L\'application est disponible uniquement du lundi au vendredi, de 9h à 17h.');
    }
};

app.use(businessHoursMiddleware);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

app.get('/service', (req, res) => {
    res.render('service', { title: 'service' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'contact' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});
// pour lancer le serveur...http://localhost:3000