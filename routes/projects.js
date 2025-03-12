const express = require('express');
const { Proyecto, Tarea, Comentario } = require('../models');
const { where } = require('sequelize');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas para los proyectos

router.get('/', authMiddleware, async (req, res) => {
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

router.post('/', authMiddleware,async (req, res) => {
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

router.put('/:id', authMiddleware,async (req, res) => {
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

router.delete('/:id', authMiddleware,async (req, res) => {
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

router.post('/:idProyecto/tasks',authMiddleware, async (req, res) => {
    const { idProyecto } = req.params;
    const { id } = req.user;
    const { titulo, descripcion, prioridad, estado, fecha_limite } = req.body; // Falta usuarioId
    if (!titulo || !descripcion || !prioridad || !estado || !fecha_limite) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        const tarea = await Tarea.create({ titulo, descripcion, prioridad, estado, fecha_limite, proyectoId: idProyecto, usuarioId: id });
        res.status(201).json({message: 'Tarea creada'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:idProyecto/tasks', authMiddleware, async (req, res) => {
    const { idProyecto } = req.params;
    try{
        const tareas = await Tarea.findAll({
            where: { proyectoId: idProyecto},
            attributes: ['id', 'usuarioId', 'titulo', 'descripcion', 'prioridad', 'estado', 'fecha_limite']
        })
        res.json(tareas);
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:idProyecto/tasks/:idUser', authMiddleware, async (req, res) => {
    const { idProyecto, idUser } = req.params;
    try{
        const tareas = await Tarea.findAll({
            where: { proyectoId: idProyecto, usuarioId: idUser },
            attributes: ['id', 'usuarioId', 'titulo', 'descripcion', 'prioridad', 'estado', 'fecha_limite']
        })
        res.json(tareas);
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:idProyecto/tasks/:idTarea', authMiddleware, async (req, res) => {
    const { idProyecto, idTarea } = req.params;
    try{
        const tarea
        = await Tarea.findOne({
            where: { id: idTarea, proyectoId: idProyecto },
            attributes: ['id', 'usuarioId','titulo', 'descripcion', 'prioridad', 'estado', 'fecha_limite']
        })
        res.json(tarea);
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.put('/:idProyecto/tasks/:idTarea', authMiddleware, async (req, res) => {
    const { idProyecto, idTarea } = req.params;
    const { titulo, descripcion, prioridad, estado, fecha_limite } = req.body;
    if (!titulo || !descripcion || !prioridad || !estado || !fecha_limite) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        await Tarea.update({ titulo, descripcion, prioridad, estado, fecha_limite }, { where: { id: idTarea, proyectoId: idProyecto } });
        res.json({message: 'Tarea actualizada'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.delete('/:idProyecto/tasks/:idTarea', authMiddleware, async (req, res) => {
    const { idProyecto, idTarea } = req.params;
    try{
        await Tarea.destroy({ where: { id: idTarea, proyectoId: idProyecto } });
        res.json({message: 'Tarea eliminada'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Rutas para los comentarios

router.post('/:idProyecto/tasks/:idTarea/comments', authMiddleware, async (req, res) => {
    const { idTarea } = req.params;
    const { id } = req.user;
    const { contenido } = req.body; // Falta usuarioId
    if (!contenido) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        const comentario = await Comentario.create({ contenido, tareaId: idTarea, usuarioId: id });
        res.status(201).json({message: 'Comentario creado'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:idProyecto/tasks/:idTarea/comments', authMiddleware, async (req, res) => {
    const { idTarea } = req.params;
    try{
        const comentarios = await Comentario.findAll({
            where: { tareaId: idTarea }, //falta usuarioId
            attributes: ['id', 'usuarioId', 'contenido', 'tareaId']
        })
        res.json(comentarios);
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:idProyecto/tasks/:idTarea/comments/:idComentario', authMiddleware, async (req, res) => {
    const { idTarea, idComentario } = req.params;
    try{
        const comentario
        = await Comentario.findOne({
            where: { id: idComentario, tareaId: idTarea },
            attributes: ['id', 'usuarioId', 'contenido', 'tareaId']
        })
        res.json(comentario);
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:idProyecto/tasks/:idTarea/comments/:idUsuario', authMiddleware, async (req, res) => {
    const { idTarea, idUsuario } = req.params;
    try{
        const comentarios
        = await Comentario.findAll({
            where: { tareaId: idTarea, usuarioId: idUsuario },
            attributes: ['id', 'usuarioId', 'contenido', 'tareaId']
        })
        res.json(comentarios);
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.put('/:idProyecto/tasks/:idTarea/comments/:idComentario', authMiddleware, async (req, res) => {
    const { idTarea, idComentario } = req.params;
    const { contenido } = req.body;
    if (!contenido) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        await Comentario.update({ contenido }, { where: { id: idComentario, tareaId: idTarea } });
        res.json({message: 'Comentario actualizado'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

router.delete('/:idProyecto/tasks/:idTarea/comments/:idComentario', authMiddleware, async (req, res) => {
    const { idTarea, idComentario } = req.params;
    try{
        await Comentario.destroy({ where: { id: idComentario, tareaId: idTarea } });
        res.json({message: 'Comentario eliminado'});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}
);


module.exports = router;
