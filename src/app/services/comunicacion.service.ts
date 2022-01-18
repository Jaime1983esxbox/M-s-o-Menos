import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  mensajeSubjectAciertos = new Subject<number>();
  contadorAciertos: number = 0;

  mensajeSubjectRecordPrecio = new Subject<number>();
  recordAciertosPrecio: number = 0;

  mensajeSubjectRecordEdad = new Subject<number>();
  recordAciertosEdad: number = 0;

  constructor() { }

  crearContador(contadorPrecio: number){
    localStorage.setItem('contadorAciertos', JSON.stringify(contadorPrecio));
    this.mensajeSubjectAciertos.next(contadorPrecio);
    this.contadorAciertos = contadorPrecio;
  }

  guardarContador(): number{
    let mensajeLocalStorage: any = localStorage.getItem('contadorAciertos');
    this.contadorAciertos = mensajeLocalStorage;
    return this.contadorAciertos;
  }

  crearRecordPrecio(recordPrecio: number){
    localStorage.setItem('recordAciertosPrecio', JSON.stringify(recordPrecio));
    this.mensajeSubjectRecordPrecio.next(recordPrecio);
    this.recordAciertosPrecio = recordPrecio;
  }

  guardarRecordPrecio(): number{
    let mensajeLocalStorage: any = localStorage.getItem('recordAciertosPrecio');
    this.recordAciertosPrecio = mensajeLocalStorage;
    return this.recordAciertosPrecio;
  }

  crearRecordEdad(recordEdad: number){
    localStorage.setItem('recordAciertosEdad', JSON.stringify(recordEdad));
    this.mensajeSubjectRecordEdad.next(recordEdad);
    this.recordAciertosEdad = recordEdad;
  }

  guardarRecordEdad(): number{
    let mensajeLocalStorage: any = localStorage.getItem('recordAciertosEdad');
    this.recordAciertosEdad = mensajeLocalStorage;
    return this.recordAciertosEdad;
  }
}
