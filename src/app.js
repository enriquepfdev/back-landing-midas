import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import campaniasRoutes from './routes/campanias.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', campaniasRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
