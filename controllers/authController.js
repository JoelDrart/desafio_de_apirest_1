const bycrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { Usuario} = require('../models');

exports.registrarUsuario = async (req, res) => {
    const {nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        const usuarioId = uuidv4();
        const hashedPassword = await bycrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({ usuarioId:usuarioId, nombre, email, password: hashedPassword, rol });

        const token = jwt.sign({id: nuevoUsuario.usuarioId, rol: nuevoUsuario.rol}, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log(token);
        res.status(201).json({message: 'Usuario registrado', token});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Falta información' });
    }
    try{
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        const passwordValido = await bycrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ message: 'Credenciales no válidas' });
        }
        const token = jwt.sign({id: usuario.usuarioId, rol: usuario.rol}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({message: 'Usuario logueado', token});
    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}