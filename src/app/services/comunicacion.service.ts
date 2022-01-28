import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Ciudad } from '../models/ciudad';
import { Pais } from '../models/pais';

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

  mensajeSubjectNivel = new Subject<string>();
  nivel!: string;

  constructor(private http: HttpClient) { }

  recuperarPaisesYCiudades(): Observable<any>{
    return this.http.get<any>('https://countriesnow.space/api/v0.1/countries')
    .pipe(map(response => {
      let paises: Pais[] = [];
      response.data.forEach((pais: any) => {
        let paisGuardado = new Pais();
        paisGuardado.name = pais.country;
        pais.cities.forEach((ciudad: any) => {
          let ciudadGuardada = new Ciudad();
          ciudadGuardada.name = ciudad;
          paisGuardado.ciudades.push(ciudadGuardada);
        });
        paises.push(paisGuardado);
      })
      return paises;
    }),
    catchError((err:HttpErrorResponse) => {
      console.error(err);
      return throwError(err);
    }));
  }

  crearContador(contadorAciertos: number){
    localStorage.setItem('contadorAciertos', JSON.stringify(contadorAciertos));
    this.mensajeSubjectAciertos.next(contadorAciertos);
    this.contadorAciertos = contadorAciertos;
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

  crearNivelDificultad(nivel: string){
    localStorage.setItem('nivel', nivel);
    this.mensajeSubjectNivel.next(nivel);
    this.nivel = nivel;
  }

  guardarNivelDificultad(): string{
    let mensajeLocalStorage: any = localStorage.getItem('nivel');
    this.nivel = mensajeLocalStorage;
    return this.nivel;
  }
}