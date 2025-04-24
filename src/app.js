import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import campaniasRoutes from './routes/campanias.routes.js';
import contactoLanding from './routes/contacto_landing.js';
import contactoRoutes from './routes/contacto.js';
import postulacionRoutes from './routes/postulacion_landing.js';
import registroPostulacionRoutes from './routes/postulacion.js';
import preferenciasContactoRoutes from './routes/preferencias_contacto.js';
import procedenciaRoutes from './routes/procedencia.js';
import sedeRoutes from './routes/sede.js';
import tipoDocumentoRoutes from './routes/tipo_documento.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', campaniasRoutes);
app.use('/api', contactoLanding);
app.use('/api', contactoRoutes);
app.use('/api', postulacionRoutes);
app.use('/api', registroPostulacionRoutes);
app.use('/api', preferenciasContactoRoutes);
app.use('/api', procedenciaRoutes);
app.use('/api', sedeRoutes);
app.use('/api', tipoDocumentoRoutes);


app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
