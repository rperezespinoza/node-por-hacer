const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
var colors = require('colors');

let comando = argv._[0];
//console.log(argv);

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        listado.forEach(tarea => {
            console.log('========Por hacer======'.green);
            console.log(tarea.descripcion);
            console.log(`Estado : ${tarea.completado}`);
            console.log('======================='.green);
        });
        //console.log('Mostrar todas las tareas por hacer');
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let elBorrado = porHacer.borrar(argv.descripcion);
        console.log(elBorrado);
        break;
    default:
        console.log('El comando no es reconocido');
        break;
}

const listar = () => {

    let listado = porHacer.getListado();

    listado.forEach(tarea => {
        console.log('========Por hacer======'.green);
        console.log(tarea.descripcion);
        console.log(`Estado : ${tarea.completado}`);
        console.log('===================='.green);
    });
}