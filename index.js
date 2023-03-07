import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import usuarioRoutes from './routes/usuarioRouter.js';
import listaDeTareasRouter from './routes/listaDeTareasRouter.js';
import homePage from './routes/homePageRouter.js'
import capitulos from './routes/capitulosRouter.js';
import eventos from './routes/eventosRouter.js';
import proyectos from './routes/proyectosRouter.js';
import actividades from './routes/actividadesRouter.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import db from './config/db.js'; 

const app = express();

// swagger
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API asociación de mecatrónicos',
        version: '1.0.0',
        description: 'Documentación de la API con Swagger',
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        },
        contact: {
          name: 'Erick Villafuerte, Axel Ramos',
          url: 'https://www.linkedin.com/in/erick-villafuerte/',
          email: 'erick.m.villa.r@gmail.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ]
    },
    apis: ['./routes/*.js']
  };

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// conectar a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Base de datos conectada correctamente');
} catch (error) {
    console.log(error);
}


app.use('/auth', usuarioRoutes);
app.use('/tareas', listaDeTareasRouter);
app.use('/', homePage);
app.use('/capitulos', capitulos);
app.use('/proyectos', proyectos);
app.use('/eventos', eventos);
app.use('/actividades', actividades);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// ruta para rutas que no existen
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// inicializa o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port 3000, http://localhost:${port}`);
});

