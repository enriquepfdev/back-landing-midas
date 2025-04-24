// src/routes/contacto.routes.js
import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

router.post('/contacto', express.json(), async (req, res) => {
  const { nombres, correo, id_preferencia, id_procedencia, mensaje } = req.body;

  // 📅 Fecha y hora en zona horaria de Lima
  const fechaHoraLima = new Date().toLocaleString('en-US', {
    timeZone: 'America/Lima',
    hour12: false
  });

  const [fechaLima, horaLima] = fechaHoraLima.split(', ');
  const [mm, dd, yyyy] = fechaLima.split('/');
  const fechaFormatoMySQL = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;

  try {
    const [result] = await pool.query(`
      INSERT INTO contacto (
        nombres,
        correo,
        id_preferencia,
        id_procedencia,
        mensaje,
        fecha_registro,
        hora_registro
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [nombres, correo, id_preferencia, id_procedencia, mensaje, fechaFormatoMySQL, horaLima]);

    res.status(200).json({ success: true, id_insertado: result.insertId });
  } catch (error) {
    console.error('❌ Error al guardar contacto:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
});

export default router;
