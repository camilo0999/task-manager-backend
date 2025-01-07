const User = require('../models/userModel');
const Task = require('../models/taskModel');
const { col } = require('sequelize');

exports.getUsers = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const role = user.role;

        if (role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        const users = await User.findAll(); // Usamos Sequelize para obtener los usuarios
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.blockUser = async (req, res) => {
    try {
       const id = req.params.id;
        const user = await User.findByPk(id); // Encuentra id admin
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }

        const user2 = await User.findByPk(req.params.id2); // Encuentra el usuario por id
        if (!user2) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await user2.update({ blockaded: 1 }); // Bloquea al usuario
        res.json({ message: 'Usuario bloqueado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unblockUser = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await User.findByPk(id); // Encuentra id admin
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        const user2 = await User.findByPk(req.params.id2); // Encuentra el usuario por su ID
        if (!user2) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await user2.update({ blockaded: 0 }); // Desbloquea al usuario
        res.json({ message: 'Usuario desbloqueado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getTasks = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await User.findByPk(id); // Encuentra id admin
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.dataAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id); // Encuentra id admin

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }

        const numTasks = await Task.count();
        const numUsers = await User.count();
        const numTasksCompleted = await Task.count({ where: { completed: true } });
        const numTasksNotCompleted = await Task.count({ where: { completed: false } });

        res.json({
           
                numTasks,
                numUsers,
                numTasksCompleted,
                numTasksNotCompleted,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
