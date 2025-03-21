/* const jwt = require('jsonwebtoken');

// Middleware para verificar que el usuario tenga el rol 'admin_super' o 'admin_registrador'
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  // const token = req.headers.authorization?.split(' ')[1];  // Obtener el token del header
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    // Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Definir los roles permitidos
    const allowedRoles = ['admin_super', 'admin_registrador'];

    // Verificar si el rol del usuario está en los roles permitidos
    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'No autorizado para este rol' });
    }

    // Si el rol es uno de los permitidos, asignamos los datos del usuario decodificado a `req.user`
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido', error: err.message });
  }
};

module.exports = authMiddleware; */

const jwt = require('jsonwebtoken');

// Middleware para verificar que el usuario tenga uno de los roles permitidos y manejar expiración de token
const authMiddleware = (req, res, next) => {
  //const token = req.cookies.token;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    // Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Definir los roles permitidos
    const allowedRoles = ['admin_super', 'admin_registrador'];

    // Verificar si el rol del usuario está en los roles permitidos
    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'No autorizado para este rol' });
    }

    req.user = decoded; // Asignamos los datos del usuario decodificado
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Por favor, refresque su token.' });
    }

    res.status(401).json({ message: 'Token inválido', error: err.message });
  }
};

module.exports = authMiddleware;