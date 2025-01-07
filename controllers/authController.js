const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { username, password, role, name, lastname, telefono } = req.body;
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
            blockaded: false,
        });

        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user' });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            "token": token,
            "username": user.username,
            "role": user.role,
            "lastname": user.lastname,
            "name": user.name,
            "telefono": user.telefono,
            "id": user.id,
        });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Error logging in user' });
    }

};
