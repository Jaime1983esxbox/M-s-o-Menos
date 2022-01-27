import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { Ciudad } from 'src/app/models/ciudad';
import { Pais } from 'src/app/models/pais';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  nombre = new FormControl('', Validators.pattern('[a-zA-Z ]*'));
  apellidos = new FormControl('', Validators.pattern('[a-zA-Z ]*'));
  email = new FormControl('', [Validators.required, Validators.email]);
  fechaNacimiento = new FormControl('', [Validators.required]);
  usuario = new FormControl('', Validators.pattern('[a-zA-Z0-9_-]{5,15}'));
  password = new FormControl('', Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}'));
  dniValidator = new FormControl('', Validators.pattern('[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]'));
  direccion = new FormControl('', Validators.pattern('[a-zA-Z0-9/-º\ ]*'));
  paisValidator = new FormControl('', [Validators.required]);
  ciudad = new FormControl('', [Validators.required]);
  hide = true;
  tipo!: string;
  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  pais!: Pais;
  minDate!: Date;
  maxDate!: Date;
  dni!: any;
  letra!: string;

  constructor(private comunicacionService: ComunicacionService,  
    private activatedRoute: ActivatedRoute, private router: Router,) {
      const currentYear = new Date().getFullYear();
      const diaActual = new Date().getDate();
      const mesActual = new Date().getMonth();
      this.minDate = new Date(currentYear - 90, 0, 1);
      this.maxDate = new Date(currentYear - 18, mesActual, diaActual);
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
      if(this.tipo == undefined){
        this.tipo = Constants.TIPO_INICIO;
      }
    })

    this.comunicacionService.recuperarPaisesYCiudades().subscribe(
      response =>{
        this.paises = response;
        this.pais = this.paises[0];
        this.ciudades = this.pais.ciudades;
      }
    )
  }

  getCities(pais: Pais){
    this.ciudades = [];
    this.ciudades = pais.ciudades;
  }

  getErrorNombre(){
    if (this.nombre.hasError('required')) {
      return 'Debes introducir un nombre';
    }
    return this.nombre.hasError('pattern') ? 'nombre no válido' : '';
  }

  getErrorApellidos(){
    if (this.apellidos.hasError('required')) {
      return 'Debes introducir los apellidos';
    }
    return this.apellidos.hasError('pattern') ? 'apellidos no válidos' : '';
  }

  getErrorEmail() {
    if (this.email.hasError('required')) {
      return 'Debes introducir un email';
    }
    return this.email.hasError('email') ? 'email no válido' : '';
  }

  getErrorFechaNacimiento(){
    if (this.fechaNacimiento.hasError('required')) {
      return 'Debes seleccionar la fecha de nacimiento';
    }
    return null;
  }

  getErrorUsuario(){
    if (this.usuario.hasError('required')) {
      return 'Debes introducir un nombre de usuario';
    }
    return this.usuario.hasError('pattern') ? 'usuario no válido' : '';
  }

  getErrorPassword(){
    if (this.password.hasError('required')) {
      return 'Debes introducir un password';
    }
    return this.password.hasError('pattern') ? 'password no válido' : '';
  }

  getErrorDni() {
    if (this.dniValidator.hasError('required')) {
      return 'Debes introducir un DNI';
    }
    this.dni = ''
    return this.dniValidator.hasError('pattern') ? 'DNI no válido' : '';
  }

  getErrorDireccion() {
    if (this.direccion.hasError('required')) {
      return 'Debes introducir una dirección';
    }
    return this.direccion.hasError('pattern') ? 'dirección no válida' : '';
  }

  getErrorPais() {
    if (this.paisValidator.hasError('required')) {
      return 'Debes seleccionar un país';
    }
    return null;
  }

  getErrorCiudad() {
    if (this.ciudad.hasError('required')) {
      return 'Debes seleccionar una ciudad';
    }
    return null;
  }

  compararPrecio(){
    this.router.navigate(['/comparacion'], { queryParams: { tipo: Constants.TIPO_PRECIO } });
  }

  compararEdad(){
    this.router.navigate(['/comparacion'], { queryParams: { tipo: Constants.TIPO_EDAD } });
  }

  letraDni(dni: number) {
    let letras = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
    this.letra = letras [dni%23];
    this.dni = dni + this.letra;
    if(dni == 8){
      return this.dni;
    }else{
      this.dni = '';
      return 'DNI no válido';
    }
    
  }

  crear(){
    this.router.navigateByUrl('/inicio');
  }

  volver(){
    this.router.navigateByUrl('');
  }

}
