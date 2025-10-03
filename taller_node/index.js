const moment = require('moment');
const _ = require('lodash');
const { faker } = require('@faker-js/faker');

console.log("¡Hola mundo!")

console.log("Hora actual: " + moment().format('YYYY-MM-DD'));

console.log ("Valor máximo de [10, 5, 20, 8] es: " + _.max([10, 5, 20, 8]))

console.log ("Resultado de eliminar duplicados de [1, 2, 2, 3, 4, 4, 5] es: " + _.uniq([1, 2, 2, 3, 4, 4, 5]))

console.log("Correo aleatorio: " + faker.internet.email());
console.log("Tarjeta aleatoria: " + faker.finance.creditCardNumber());