// importamos nuestros modelos con sintaxis ES6
import Capitulos from './Capitulos.js';
import Sedes from './Sedes.js';
import Miembros from './Miembros.js';
import Actividades from './Actividades.js';
import Usuario from './Usuario.js';
import Mensaje from './Mensaje.js';
import ListaTarea from './ListaTarea.js';
import Proyectos from './Proyectos.js';
import Asistencia from './Asistencia.js';
import Evento from './Evento.js';

// creamos las relaciones entre los modelos
// Capitulo tiene muchas Sedes
// Sede pertenece a un Capitulo y tiene muchos miembros y actividades
// Miembro pertenece a una Sede
// Actividad pertenece a una Sede
// Usuario tiene muchos mensajes
Capitulos.hasMany(Sedes);
Sedes.belongsTo(Capitulos);
Sedes.hasMany(Miembros);
Miembros.belongsTo(Sedes);
Proyectos.belongsTo(Usuario);
Actividades.belongsTo(Proyectos);
Proyectos.hasMany(Actividades, {foreignKey: 'proyectoId'});
ListaTarea.belongsTo(Usuario);
Mensaje.belongsTo(Usuario);

Usuario.hasMany(Asistencia);
Evento.hasMany(Asistencia);
Asistencia.belongsTo(Usuario);
Asistencia.belongsTo(Evento);

export {
    Capitulos, 
    Sedes, 
    Miembros, 
    Actividades, 
    Usuario, 
    Mensaje, 
    Proyectos,
    ListaTarea,
    Asistencia,
    Evento
};
