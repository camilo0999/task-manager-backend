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
    .then(() => {
        console.log('Connected to PostgreSQL successfully!');
        // Sincronizar los modelos con la base de datos
        return sequelize.sync({ alter: true }); // usar { force: true } para forzar la recreación de tablas
    })
    .then(() => console.log('All tables created successfully!'))
    .catch((err) => console.error('Unable to connect to PostgreSQL:', err));

const authenticateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL exitosa');
        // Sincronizar los modelos con la base de datos
        await sequelize.sync({ alter: true }); // usar { force: true } para forzar la recreación de tablas
        console.log('¡Todas las tablas creadas exitosamente!');
    } catch (error) {
        console.error('No se pudo conectar a PostgreSQL:', error);
    }
};

authenticateDatabase();

module.exports = sequelize;
