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

  private selectedCountry: BehaviorSubject<Pais>;
  public observableSelectedCountry: Observable<Pais>;

  constructor(private http: HttpClient) {
    let paisSeleccionado: any = localStorage.getItem('selectedCountry');
    this.selectedCountry = new BehaviorSubject<Pais>(JSON.parse(paisSeleccionado));
    this.observableSelectedCountry = this.selectedCountry.asObservable();
  }

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

  changeSelectedCountry(pais: Pais) {
    localStorage.setItem("selectedCountry", JSON.stringify(pais));
    this.selectedCountry.next(pais);
  }

  consultCountry(): Pais{
    let paisSeleccionado: any = (localStorage.getItem('selectedCountry'));
    let pais = JSON.parse(paisSeleccionado);
    return pais;
  }

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