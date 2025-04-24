import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

// 🔍 Obtener todas las postulaciones con detalles
router.get('/listar-postulacion', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id_postulacion,
        p.documento,
        p.apellidos,
        p.celular,
        c.descripcion AS campaña,
        s.descripcion AS sede,
        p.fecha_postulacion,
        p.hora_postulacion
      FROM postulacion p
      JOIN campaña c ON p.id_campaña = c.id_campaña
      JOIN sede s ON p.id_sede = s.id_sede
      ORDER BY p.fecha_postulacion DESC, p.hora_postulacion DESC;
    `);

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('❌ Error al obtener postulaciones:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
});

export default router;
