"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let productoNombre = "Laptop";
let productoPrecio = 1200;
let productoEnStock = true;
// ❌ El editor te mostrará un error aquí
/*
productoPrecio = "mil doscientos";
productoNombre = 12
productoEnStock = 1;
*/
console.log("Hola");
let nombre = 'Pepe';
nombre = 10;
let datosAPI = JSON.parse('{"nombre": "tablet", "precio": 300}');
if (typeof datosAPI === 'object' && datosAPI !== null) {
    // ✅ Comprobación para acceder de forma segura
    let producto = datosAPI;
    console.log(producto.nombre);
}
function registrarMensaje(mensaje) {
    console.log("LOG:", mensaje);
}
function detenerProceso(razon) {
    throw new Error(`Proceso detenido: ${razon}`);
}
registrarMensaje("Este es un mensaje de log");
//detenerProceso("Detener proceso")
let usuariosIDs = [101, 102, 103];
let gpsCoordenadas = [40.7128, -74.0060, 11];
var EstadoOrden;
(function (EstadoOrden) {
    EstadoOrden[EstadoOrden["Pendiente"] = 0] = "Pendiente";
    EstadoOrden[EstadoOrden["Enviada"] = 1] = "Enviada";
    EstadoOrden[EstadoOrden["Entregada"] = 2] = "Entregada";
    EstadoOrden[EstadoOrden["Cancelada"] = 3] = "Cancelada";
})(EstadoOrden || (EstadoOrden = {}));
;
let miOrdenEstado = EstadoOrden.Enviada;
console.log(usuariosIDs);
console.log(gpsCoordenadas);
console.log(miOrdenEstado);
console.log(EstadoOrden[miOrdenEstado]);
let miId = "a-123";
console.log("miId ->" + miId + " tipo->" + typeof (miId));
miId = 123;
console.log("miId ->" + miId + " tipo->" + typeof (miId));
let nuevoDev = {
    nombre: "Carlos",
    email: "carlos@empresa.com",
    lenguaje: "TypeScript",
    senioridad: "junior"
};
console.log(nuevoDev);
function saludar(nombre = 'Desconocido', titulo, ...amigos) {
    let saludo = titulo ? `${titulo} ${nombre}` : nombre;
    if (amigos.length > 0) {
        saludo += `, y tus amigos ${amigos.join(', ')}`;
    }
    return `Hola, ${saludo}.`;
}
console.log(saludar()); // Hola, Desconocido 
console.log(saludar("Ana")); // Hola, Ana  
console.log(saludar("Pedro", "Sr.")); // Hola, Sr. Pedro
console.log(saludar("Maria", undefined, "Juan", "Pedro", "Marcos")); // Hola, Maria, y tus amigos Juan, Pedro   
let usuario = { id: 10, nombre: "Luis" };
//usuario.id = 11; // ❌ Error, es de solo lectura
console.log(usuario);
usuario.email = "luis@correo.com"; // ✅ Válido
console.log(usuario);
class Vehiculo {
    ruedas;
    constructor(ruedas) {
        this.ruedas = ruedas;
    }
    arrancar() {
        console.log("El vehículo está arrancando.");
    }
}
class Coche extends Vehiculo {
    marca;
    _velocidad = 0;
    constructor(ruedas, marca) {
        super(ruedas);
        this.marca = marca;
    }
    // Puedes acceder a 'this.ruedas' porque es 'protected'
    getInfo() {
        console.log(`Este coche ${this.marca} tiene ${this.ruedas} ruedas.`);
    }
    // Métodos que manipulan la propiedad 'private'
    acelerar(cantidad) {
        this._velocidad += cantidad;
    }
}
const miCoche = new Coche(4, "Toyota");
miCoche.arrancar();
miCoche.acelerar(50);
miCoche.getInfo();
//miCoche._velocidad = 100; // ❌ Error, es privado
miCoche.marca = "Chevrolet";
miCoche.getInfo();
class ColaCadenas {
    items = [];
    agregar(item) {
        this.items.push(item);
    }
    obtenerPrimerElemento() {
        return this.items.shift();
    }
}
class ColaNumeros {
    items = [];
    agregar(item) {
        this.items.push(item);
    }
    obtenerPrimerElemento() {
        return this.items.shift();
    }
}
class Cola {
    items = [];
    agregar(item) {
        this.items.push(item);
    }
    obtenerPrimerElemento() {
        return this.items.shift();
    }
}
const colaNumeros = new Cola();
colaNumeros.agregar(10);
colaNumeros.agregar(20);
colaNumeros.agregar(23);
const primerNumero = colaNumeros.obtenerPrimerElemento(); // Tipo: number
console.log(primerNumero); // 10 
const colaCadenas = new Cola();
colaCadenas.agregar("hola");
colaCadenas.agregar("otro");
colaCadenas.agregar("10");
const primerCadena = colaCadenas.obtenerPrimerElemento(); // Tipo: number
console.log(primerCadena); // 10
const utils_1 = require("./utils");
const resultado = (0, utils_1.sumar)(5, 10);
console.log(`El resultado de la suma es: ${resultado}`);
//# sourceMappingURL=main.js.map