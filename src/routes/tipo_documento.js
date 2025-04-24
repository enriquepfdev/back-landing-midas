import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

router.get('/tipo_documento', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_tp_documento, descripcion
      FROM tipo_documento
      WHERE estado = 'A'
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error('❌ Error al obtener tipo de documentos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
