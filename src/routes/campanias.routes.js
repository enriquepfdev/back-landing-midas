import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/campanias', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_campaña, descripcion FROM campaña WHERE estado = "A"');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener campañas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
