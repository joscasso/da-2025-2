let productoNombre: string = "Laptop";
let productoPrecio: number = 1200;
let productoEnStock: boolean = true;

// ❌ El editor te mostrará un error aquí
/*
productoPrecio = "mil doscientos"; 
productoNombre = 12
productoEnStock = 1;
*/
console.log("Hola")

let nombre:any = 'Pepe'
nombre = 10

let datosAPI: unknown = JSON.parse('{"nombre": "tablet", "precio": 300}');

if (typeof datosAPI === 'object' && datosAPI !== null) {
  // ✅ Comprobación para acceder de forma segura
  let producto = datosAPI as { nombre: string, precio: number };
  console.log(producto.nombre);
}

function registrarMensaje(mensaje: string): void {
  console.log("LOG:", mensaje);
}

function detenerProceso(razon: string): never {
  throw new Error(`Proceso detenido: ${razon}`);
}

registrarMensaje("Este es un mensaje de log")

//detenerProceso("Detener proceso")

let usuariosIDs: number[] = [101, 102, 103];
let gpsCoordenadas: [number, number, number] = [40.7128, -74.0060, 11];

enum EstadoOrden { Pendiente, Enviada, Entregada, Cancelada };
let miOrdenEstado: EstadoOrden = EstadoOrden.Enviada;

console.log(usuariosIDs);
console.log(gpsCoordenadas);
console.log(miOrdenEstado);
console.log(EstadoOrden[miOrdenEstado]);

type ID = string | number;
let miId: ID = "a-123";
console.log("miId ->" + miId + " tipo->" + typeof(miId))

miId = 123;
console.log("miId ->" + miId + " tipo->" + typeof(miId))


type Empleado = { nombre: string, email: string };
type Desarrollador = Empleado & { lenguaje: string, senioridad: "junior" | "senior" };

let nuevoDev: Desarrollador = {
  nombre: "Carlos",
  email: "carlos@empresa.com",
  lenguaje: "TypeScript",
  senioridad: "junior"
};
 console.log(nuevoDev);

 function saludar(nombre: string = 'Desconocido', titulo?: string, ...amigos: string[]): string {
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

interface Usuario {
  readonly id: number;
  nombre: string;
  email?: string;
}

let usuario: Usuario = { id: 10, nombre: "Luis" };
//usuario.id = 11; // ❌ Error, es de solo lectura
console.log(usuario)
usuario.email = "luis@correo.com"; // ✅ Válido
console.log(usuario)

class Vehiculo {
  protected ruedas: number;
  constructor(ruedas: number) {
    this.ruedas = ruedas;
  }
  public arrancar(): void {
    console.log("El vehículo está arrancando.");
  }
}

class Coche extends Vehiculo {
  public marca: string;
  private _velocidad: number = 0;

  constructor(ruedas: number, marca: string) {
    super(ruedas);
    this.marca = marca;
  }
  
  // Puedes acceder a 'this.ruedas' porque es 'protected'
  public getInfo(): void {
    console.log(`Este coche ${this.marca} tiene ${this.ruedas} ruedas.`);
  }

  // Métodos que manipulan la propiedad 'private'
  public acelerar(cantidad: number): void {
    this._velocidad += cantidad;
  }
}

const miCoche = new Coche(4, "Toyota");
miCoche.arrancar();
miCoche.acelerar(50);
miCoche.getInfo();
//miCoche._velocidad = 100; // ❌ Error, es privado
miCoche.marca = "Chevrolet"
miCoche.getInfo();

class ColaCadenas {
  private items: string[] = [];
  
  agregar(item: string): void {
    this.items.push(item);
  }
  
  obtenerPrimerElemento(): string | undefined {
    return this.items.shift();
  }
}

class ColaNumeros {
  private items: number[] = [];
  
  agregar(item: number): void {
    this.items.push(item);
  }
  
  obtenerPrimerElemento(): number | undefined {
    return this.items.shift();
  }
}

class Cola<T> {
  private items: T[] = [];
  
  agregar(item: T): void {
    this.items.push(item);
  }
  
  obtenerPrimerElemento(): T | undefined {
    return this.items.shift();
  }
}

const colaNumeros = new Cola<number>();
colaNumeros.agregar(10);
colaNumeros.agregar(20);
colaNumeros.agregar(23);
const primerNumero = colaNumeros.obtenerPrimerElemento(); // Tipo: number
console.log (primerNumero); // 10 

const colaCadenas = new Cola<string>();
colaCadenas.agregar("hola");
colaCadenas.agregar("otro");
colaCadenas.agregar("10");
const primerCadena = colaCadenas.obtenerPrimerElemento(); // Tipo: number
console.log (primerCadena); // 10
 
import { sumar } from './utils';

const resultado = sumar(5, 10);
console.log(`El resultado de la suma es: ${resultado}`);

