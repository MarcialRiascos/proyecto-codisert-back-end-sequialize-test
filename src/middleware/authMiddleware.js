/* const jwt = require('jsonwebtoken');

const authMiddleware = (role) => (req, res, next) => {
  const token = req.cookies.token
  // const token = req.headers.authorization?.split(' ')[1];  // Obtener el token del header
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el rol del usuario coincide con el rol requerido
    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'No autorizado para este rol' });
    }

    req.user = decoded; // Asignar los datos del usuario decodificado al request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido', error: err.message });
  }
};

module.exports = authMiddleware; */

const jwt = require('jsonwebtoken');

// Middleware para verificar el rol y manejar la expiración del token
const authMiddleware = (role) => (req, res, next) => {
  const token = req.cookies.token;

  // Si no hay token, retornamos un error de autenticación
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    // Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si se proporciona un rol, verificamos si el rol del usuario coincide con el rol requerido
    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'No autorizado para este rol' });
    }

    // Asignamos los datos del usuario decodificado al request
    req.user = decoded;

    next(); // Continuamos con el siguiente middleware o controlador
  } catch (err) {
    // Si el token ha expirado, devolvemos un error específico
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Por favor, refresque su token.' });
    }

    // Si el token es inválido por alguna otra razón
    res.status(401).json({ message: 'Token inválido', error: err.message });
  }
};

module.exports = authMiddleware;