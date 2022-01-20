import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  contadorAciertos: number = 0;
  recordAciertosPrecio: number = 0;
  recordAciertosEdad: number = 0;
  isRecord: boolean = false;

  constructor(private comunicacionService: ComunicacionService, private router: Router) { }

  ngOnInit(): void {

    this.contadorAciertos = this.comunicacionService.guardarContador();

    if (this.contadorAciertos < 1) {
      this.contadorAciertos = 0;
    }

    if (this.contadorAciertos == 41) {
      this.isRecord = true;
    } else {
      this.isRecord = false;
    }
  }

  volver() {
    if (this.contadorAciertos > this.recordAciertosPrecio) {
      this.contadorAciertos = this.comunicacionService.guardarRecordPrecio();
    }
    if (this.contadorAciertos > this.recordAciertosEdad) {
      this.contadorAciertos = this.comunicacionService.guardarRecordEdad();
    }
    localStorage.removeItem('contadorAciertos');
    this.router.navigateByUrl('');
  }

}
