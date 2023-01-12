import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRouter.js';
import listaDeTareasRouter from './routes/listaDeTareasRouter.js';
import homePage from './routes/homePageRouter.js'
import db from './config/db.js'; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// conectar a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Base de datos conectada correctamente');
} catch (error) {
    console.log(error);
}

// rutas disponibles
app.use('/auth', usuarioRoutes);
app.use('/listaTarea', listaDeTareasRouter);
app.use('/', homePage);

// ruta para rutas que no existen
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// inicializa o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port 3000, http://localhost:${port}`);
});

