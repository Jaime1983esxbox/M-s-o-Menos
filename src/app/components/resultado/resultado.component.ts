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
  recordAciertos: number = 0;
  derrota: boolean = true;
  victoria: boolean = false;

  constructor(private comunicacionService: ComunicacionService, private router: Router) { }

  ngOnInit(): void {
    this.contadorAciertos = this.comunicacionService.guardarContador();
    if(this.contadorAciertos < 1){
      this.contadorAciertos = 0;
    }

    if(this.contadorAciertos == 20){
      this.derrota = false;
      this.victoria = true;
    }
  }

  volver(){
    if(this.contadorAciertos > this.recordAciertos){
      this.contadorAciertos = this.comunicacionService.guardarRecord();
    }
    localStorage.removeItem('contadorAciertos');
    this.router.navigateByUrl('');
  }

}
