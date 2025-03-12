const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { Usuario } = require('../models');
const { registrarUsuario, loginUsuario } = require("../controllers/authController");

const router = express.Router();


router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
        attributes: ['id', 'nombre', 'email', 'rol']
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const usuario = await Usuario.findOne({
      where: { id },
      attributes: ['id', 'nombre', 'email', 'rol']
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

router.post('/', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ error: "Falta información" });
  }
  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) {
    return res.status(400).json({ error: "Usuario ya existe" });
  }
  const uniqueId = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ usuarioId: uniqueId, nombre, email, password: hashedPassword, rol });
    // console.log(usuario);
    res.status(201).json({message: "usuario creado"});
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    await Usuario.update({ nombre, email, rol }, { where: { id } });
    res.json({ success: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

router.delete('/:id', async(req, res) =>{
  const {id} = req.params;
  try{
    await Usuario.destroy({where: {id}});
    res.json({success: "Usuario eliminado"});
  }catch(error){
    res.status(500).json({error: "Error al eliminar el usuario"});
  }
})


module.exports = router;
