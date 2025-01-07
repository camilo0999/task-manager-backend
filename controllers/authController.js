const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { username, password, role, name, lastname, telefono } = req.body;

    // Verificar que todos los campos están presentes
    if (!username || !password || !role || !name || !lastname || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Crear un nuevo usuario usando el modelo Sequelize
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role,
            name,
            lastname,
            telefono,
            bloqueado: false, // Asegúrate de usar la palabra correcta aquí
        });

        res.status(201).json({ message: '¡Usuario registrado exitosamente!', user: newUser });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Verificar que todos los campos estén presentes
    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            username: user.username,
            role: user.role,
            lastname: user.lastname,
            name: user.name,
            telefono: user.telefono,
            id: user.id,
        });
    } catch (err) {
        console.error('Error al iniciar sesión del usuario:', err);
        res.status(500).json({ error: 'Error al iniciar sesión del usuario' });
    }
};
