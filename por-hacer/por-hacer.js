const fs = require('fs');

let listadoPorHacer = [];

const guardar = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

const cargarBD = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarBD();
    return listadoPorHacer;
}

const crear = (descripcion) => {

    cargarBD();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardar();

    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarBD();
    let index = listadoPorHacer.findIndex(e => e.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardar();
        return true;
    } else return false;

}

const borrar = (descripcion) => {
    cargarBD();
    /*
    let index = listadoPorHacer.findIndex(e => e.descripcion === descripcion);
    if (index >= 0) {
        let eliminado = listadoPorHacer.splice(index, 1);
        guardar();
        return eliminado;
    } else false;*/

    let nuevoListado = listadoPorHacer.filter(e => e.descripcion != descripcion);
    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardar();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}