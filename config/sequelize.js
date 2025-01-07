const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Desactiva el registro si no necesitas ver los detalles de cada consulta SQL
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
