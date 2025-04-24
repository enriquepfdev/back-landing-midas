import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/listar_contactos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT c.id_contacto, c.nombres, c.correo, c.mensaje, c.fecha_registro, c.hora_registro, p.descripcion AS preferencia, pr.descripcion AS procedencia FROM contacto c LEFT JOIN preferencias_contacto p ON c.id_preferencia = p.id_tp_documento  LEFT JOIN procedencia pr ON c.id_procedencia = pr.id_tp_documento ORDER BY c.fecha_registro DESC, c.hora_registro DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener campañas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
