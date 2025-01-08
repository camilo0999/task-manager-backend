const Task = require('../models/taskModel'); 
const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file'); // Middleware para manejar un solo archivo

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } }); // Usamos Sequelize para obtener las tareas del usuario
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id); // Encuentra la tarea por su ID
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, tags, imageUrl} = req.body;

    console.log(req.body);
    // Create task
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      tags,
      completed: false,
      userId: req.user.id,
      imageUrl
    });

    // Respond with success message and task data
    return res.status(201).json({ message: 'Tarea creada exitosamente', task });
  } catch (error) {
    // Respond with error message
    return res.status(500).json({ error: error.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    // Encuentra la tarea por su ID
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Actualiza los campos de la tarea
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.priority = req.body.priority || task.priority;
    task.tags = req.body.tags || task.tags;
    task.completed = req.body.completed || task.completed;

    console.log(task);
    // Guarda los cambios en la base de datos
    await task.save();

    // Responde con un mensaje de éxito y los datos de la tarea actualizada
    return res.json({ message: 'Tarea actualizada exitosamente', task });
  } catch (error) {
    // Responde con un mensaje de error
    return res.status(500).json({ error: error.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id); // Encuentra la tarea por su ID
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await task.destroy(); // Elimina la tarea
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id); // Encuentra la tarea por su ID
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await task.update({ completed: 1 }); // Marca la tarea como completada
    res.json({ message: 'Tarea completada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
