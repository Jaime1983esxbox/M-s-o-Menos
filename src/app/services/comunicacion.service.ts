import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  mensajeSubjectAciertos = new Subject<number>();
  contadorAciertos: number = 0;

  mensajeSubjectRecord = new Subject<number>();
  recordAciertos: number = 0;

  constructor() { }

  crearContador(contador: number){
    localStorage.setItem('contadorAciertos', JSON.stringify(contador));
    this.mensajeSubjectAciertos.next(contador);
    this.contadorAciertos = contador;
  }

  guardarContador(): number{
    let mensajeLocalStorage: any = localStorage.getItem('contadorAciertos');
    this.contadorAciertos = mensajeLocalStorage;
    return this.contadorAciertos;
  }

  crearRecord(record: number){
    localStorage.setItem('recordAciertos', JSON.stringify(record));
    this.mensajeSubjectAciertos.next(record);
    this.recordAciertos = record;
  }

  guardarRecord(): number{
    let mensajeLocalStorage: any = localStorage.getItem('recordAciertos');
    this.recordAciertos = mensajeLocalStorage;
    return this.recordAciertos;
  }
}
