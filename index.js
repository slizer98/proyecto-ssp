import express from 'express';
import open from 'open';
import usuario from './routes/usuarioRouter.js';

const app = express();

app.use(express.json());
app.use( express.urlencoded({extended: true}))
app.use('/', usuario);
// ruta para rutas que no existen
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// inicializa o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port 3000, http://localhost:${port}`);
});

