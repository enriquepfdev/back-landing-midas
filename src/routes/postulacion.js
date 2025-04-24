import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

router.post('/postulacion', express.json(), async (req, res) => {
  const { id_tipo_documento, documento, apellidos, celular, id_campaña, id_sede } = req.body;

  // ✅ Obtener fecha y hora de Lima correctamente formateadas
  const fechaHora = new Date().toLocaleString("en-US", {
    timeZone: "America/Lima",
    hour12: false
  });

  let fechaSQL = '';
  let horaSQL = '';

  if (fechaHora.includes(',')) {
    const [fecha, hora] = fechaHora.split(', ');
    const [mes, dia, anio] = fecha.split('/');
    fechaSQL = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    horaSQL = hora;
  } else {
    const now = new Date();
    fechaSQL = now.toISOString().split('T')[0];
    horaSQL = now.toTimeString().split(' ')[0];
  }

  try {
    // ✅ Verificar si ya está registrado ese documento con ese tipo y campaña
    const [existente] = await pool.query(
      'SELECT id_postulacion FROM postulacion WHERE documento = ? AND id_tipo_documento = ? AND id_campaña = ?',
      [documento, id_tipo_documento, id_campaña]
    );

    if (existente.length > 0) {
      return res.status(200).json({ success: false, already_registered: true });
    }

    // ✅ Insertar si no existe
    await pool.query(
      'INSERT INTO postulacion (id_tipo_documento, documento, apellidos, celular, id_campaña, id_sede, fecha_postulacion, hora_postulacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id_tipo_documento, documento, apellidos, celular, id_campaña, id_sede, fechaSQL, horaSQL]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error al insertar postulación:', error);
    res.status(500).json({ success: false, message: 'Error al guardar postulación' });
  }
});

export default router;
