const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Administrador');
const Role = require('../models/Role'); // Asumiendo que tienes un modelo de Role

const authController = {
  /* async login(req, res) {
    const { NumeroDocumento, Password } = req.body;

    try {
      // Buscar usuario por documento usando Sequelize
      const user = await User.findOne({ where: { NumeroDocumento } });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      // Verificar si el usuario está activo
      if (user.Estado_idEstado !== 1) {
        return res.status(403).json({ message: 'El usuario no está activo' });
      }

      // Validar contraseña usando bcrypt
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      // Obtener el rol del usuario usando Sequelize
      const role = await Role.findByPk(user.Rol_idRol);

      // Generar token
      const token = jwt.sign(
        { id: user.idAdministrador, role: role.Rol },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      // Enviar respuesta al frontend
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        role: role.Rol,
        user: {
          id: user.idAdministrador,
          name: user.Nombre,
          lastname: user.Apellido, 
          email: user.Correo,
          role: role.Rol, 
        },
      });

    } catch (err) {
      res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
  }, */

  async login(req, res) {
    const { NumeroDocumento, Password } = req.body;

    try {
      const user = await User.findOne({ where: { NumeroDocumento } });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      if (user.Estado_idEstado !== 1) {
        return res.status(403).json({ message: 'El usuario no está activo' });
      }

      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      const role = await Role.findByPk(user.Rol_idRol);

      // Generar el access token (expira en 15 minutos)
      const accessToken = jwt.sign(
        { id: user.idAdministrador, role: role.Rol },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Generar el refresh token (expira en 7 días)
      const refreshToken = jwt.sign(
        { id: user.idAdministrador, role: role.Rol },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN } // Puedes ajustar la duración aquí
      );

      // Establecer las cookies con los tokens
      res.cookie('token', accessToken, {
        httpOnly: true,  // Protege la cookie de ataques XSS
        secure: true, // Asegúrate de usar HTTPS en producción
        sameSite: 'none', // Permite cookies entre sitios
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,  // Protege la cookie de ataques XSS
        secure: true, // Asegúrate de usar HTTPS en producción
        sameSite: 'none', // Permite cookies entre sitios
      });

      // Enviar respuesta con los tokens
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token: accessToken,
        refreshToken,
        role: role.Rol,
        user: {
          id: user.idAdministrador,
          name: user.Nombre,
          lastname: user.Apellido,
          email: user.Correo,
          role: role.Rol,
        },
      });

    } catch (err) {
      res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
  },

  async refreshToken(req, res) {
    // const { refreshToken } = req.cookies; // Obtener el refresh token de la cookie
    const refreshToken = req.headers.authorization?.split(' ')[1];
    if (!refreshToken) {
      return res.status(401).json({ message: 'No se ha proporcionado un refresh token' });
    }

    try {
      // Verificar el refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Buscar al usuario usando el ID del token decodificado
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(403).json({ message: 'Usuario no encontrado para este refresh token' });
      }

      // Generar un nuevo access token
      const newAccessToken = jwt.sign(
        { id: user.idAdministrador, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Establecer el nuevo access token en la cookie
      res.cookie('token', newAccessToken, {
        httpOnly: true,
        secure: true, // Asegúrate de usar HTTPS en producción
        sameSite: 'none',
      });

      // Enviar respuesta con el nuevo access token
      res.status(200).json({
        message: 'Nuevo access token generado',
        token: newAccessToken,
      });

    } catch (err) {
      res.status(403).json({ message: 'Refresh token inválido', error: err.message });
    }
  },
};

module.exports = authController;