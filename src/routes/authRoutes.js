const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta de login
router.post('/login', authController.login);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });

  res.clearCookie("refreshToken", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });

  res.status(200).json({ message: "Sesión cerrada correctamente" });
});

router.post('/refresh-token', authController.refreshToken);
module.exports = router;