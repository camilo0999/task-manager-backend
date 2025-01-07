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
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error al subir la imagen:', err);
      return res.status(500).json({
        error: 'Hubo un problema al subir la imagen. Por favor, intenta nuevamente.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'No se recibió ningún archivo. Por favor, sube una imagen.',
      });
    }

    const filename = "/uploads/" + req.file.filename;

    try {
      // Verificar si req.user.id existe
      if (!req.user || !req.user.id) {
        return res.status(400).json({
          error: 'Usuario no autenticado. Por favor, inicia sesión.',
        });
      }

      // Validar datos de la tarea
      const { title, description, dueDate, priority, tags, completed } = req.body;
      if (!title || !description) {
        return res.status(400).json({
          error: 'El título y la descripción son obligatorios.',
        });
      }

      // Crear la tarea en la base de datos
      const task = await Task.create({
        imageUrl: filename,
        title,
        description,
        dueDate,
        priority,
        tags,
        completed,
        userId: req.user.id,
      });

      return res.status(201).json({
        message: 'Tarea creada exitosamente',
        task,
      });
    } catch (error) {
      console.error('Error al crear tarea:', error);
      return res.status(500).json({
        error: 'Ocurrió un error al guardar la tarea. Intenta nuevamente más tarde.',
      });
    }
  });
};


exports.updateTask = async (req, res) => {
  upload(req, res, async (err) => {

    if(err){
      console.error('Error al subir la imagen:', err);
      return res.status(500).json({ error: 'Hubo un problema al subir la imagen. Por favor, intenta nuevamente.' });
    }
  
    try {
      const task = await Task.findByPk(req.params.id); // Encuentra la tarea por su ID
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      // Actualiza la tarea
      await task.update({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        tags: req.body.tags
      });

      res.json({ message: 'Tarea actualizada exitosamente', task });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
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
