import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  compararPrecio(){
    this.router.navigate(['/comparacion'], { queryParams: { tipo: Constants.TIPO_PRECIO } });
  }

  compararEdad(){
    this.router.navigate(['/comparacion'], { queryParams: { tipo: Constants.TIPO_EDAD } });
  }

}
