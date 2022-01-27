import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  tipo!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  inicio(){
    this.router.navigate(['/inicio'], { queryParams: { tipo: Constants.TIPO_INICIO } });
  }

  registro(){
    this.router.navigate(['/inicio'], { queryParams: { tipo: Constants.TIPO_REGISTRO } });
  }

}
