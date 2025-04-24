import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

router.get('/sede', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_sede, descripcion
      FROM sede
      WHERE estado = 'A'
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error('❌ Error al obtener las sedes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
