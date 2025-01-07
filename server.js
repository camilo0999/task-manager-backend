const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Importación del módulo 'path'
require('dotenv').config();

const sequelize = require('./config/sequelize');
const User = require('./models/userModel');
const Task = require('./models/taskModel');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sincronizar modelos con la base de datos
sequelize
    .sync({ alter: true }) // Usa `alter: true` para actualizar las tablas existentes
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Error synchronizing database:', err));

// Configura CORS 
app.use(cors());

// Middlewares
app.use(bodyParser.json()); 

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
