const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

sequelize
    .authenticate()
    .then(() => console.log('Connected to PostgreSQL successfully!'))
    .catch((err) => console.error('Unable to connect to PostgreSQL:', err));

const authenticateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL exitosa');
    } catch (error) {
        console.error('No se pudo conectar a PostgreSQL:', error);
    }
};

authenticateDatabase();

module.exports = sequelize;
