const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./config/db');
const routes = require('./routes');

dotenv.config();

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Synchronisation de la base de données et lancement du serveur
sequelize.sync({ force: false }).then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening on port ${process.env.PORT || 3000}...`);
    });
});
