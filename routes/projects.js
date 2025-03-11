const express = require('express');
const { Proyecto } = require('../models');
const { Tarea } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const proyectos = await Proyecto.findAll({
            attributes: ['id', 'nombre', 'descripcion']
        });
        res.json(proyectos);
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/', async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        const proyecto = await Proyecto.create({ nombre, descripcion });
        res.status(201).json({message: 'Proyecto creado'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        await Proyecto.update({ nombre, descripcion }, { where: { id } });
        res.json({message: 'Proyecto actualizado'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await Proyecto.destroy({ where: { id } });
        res.json({message: 'Proyecto eliminado'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Rutas para las tareas

router.post('/:idProyecto/tasks', async (req, res) => {
    const { idProyecto } = req.params;
    const { titulo, descripcion, prioridad, estado, fecha_limite } = req.body; // Falta usuarioId
    if (!titulo || !descripcion || !prioridad || !estado || !fecha_limite) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        const tarea = await Tarea.create({ titulo, descripcion, prioridad, estado, fecha_limite, proyectoId: idProyecto });
        res.status(201).json({message: 'Tarea creada'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:idProyecto/tasks', async (req, res) => {
    const { idProyecto } = req.params;
});



module.exports = router;
