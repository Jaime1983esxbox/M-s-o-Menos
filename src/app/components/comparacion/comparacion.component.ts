import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-comparacion',
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.css']
})
export class ComparacionComponent implements OnInit {

  jugadores: Jugador[] = [];
  jugadoresPosibleComparacion: Jugador[] = [];
  jugadoresYaSeleccionados: Jugador[] = [];
  jugadorSeleccionado1!: Jugador;
  jugadorSeleccionado2!: Jugador;
  mostrarVs: boolean = true;
  mostrarAcierto: boolean = false;
  contadorAciertos: number = 0;
  recordAciertosPrecio: number = 0;
  recordAciertosEdad: number = 0;
  comparacionPrecio: boolean = false;
  comparacionEdad: boolean = false;
  precio!: number;
  edad!: number;

  constructor(private comunicacionService: ComunicacionService, private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params=>{
      this.precio = params['precio'];
      this.edad = params['edad'];
    })

    this.jugadores = [
      {nombre: 'Kylian Mbappé', edad: 23, pais: 'Francia', equipo: './assets/psg.png', precio: 160, imagen: './assets/mbappe.jpg'},
      {nombre: 'Erling Haaland', edad: 21, pais: 'Noruega', equipo: './assets/dortmund.png', precio: 150, imagen: './assets/haaland.jpg'},
      {nombre: 'Vinicius Jr', edad: 21, pais: 'Brasil', equipo: './assets/realmadrid.png', precio: 100, imagen: './assets/Vinicius.jpg'},
      {nombre: 'Mohamed Salah', edad: 29, pais: 'Egipto', equipo: './assets/liverpool.png', precio: 100, imagen: './assets/Salah.jpg'},
      {nombre: 'Harry Kane', edad: 28, pais: 'Inglaterra', equipo: './assets/hotspur.png', precio: 100, imagen: './assets/Kane.jpg'},
      {nombre: 'Romelu Lukaku', edad: 28, pais: 'Bélgica', equipo: './assets/chelsea.png', precio: 100, imagen: './assets/lukaku.jpg'},
      {nombre: 'Bruno Fernandes', edad: 27, pais: 'Portugal', equipo: './assets/united.png', precio: 90, imagen: './assets/BrunoFernandes.jpg'},
      {nombre: 'Kevin De Bruyne', edad: 30, pais: 'Bélgica', equipo: './assets/city.jpg', precio: 90, imagen: './assets/DeBruyne.jpg'},
      {nombre: 'Neymar', edad: 29, pais: 'Brasil', equipo: './assets/psg.png', precio: 90, imagen: './assets/Neymar.jpg'},
      {nombre: 'Phil Foden', edad: 21, pais: 'Inglaterra', equipo: './assets/city.jpg', precio: 85, imagen: './assets/Foden.jpg'},
      {nombre: 'Jadon Sancho', edad: 21, pais: 'Inglaterra', equipo: './assets/united.png', precio: 85, imagen: './assets/Sancho.jpg'},
      {nombre: 'Marcus Rashford', edad: 24, pais: 'Inglaterra', equipo: './assets/united.png', precio: 85, imagen: './assets/Rashford.jpg'},
      {nombre: 'Joshua Kimmich', edad: 26, pais: 'Alemania', equipo: './assets/bayern.png', precio: 85, imagen: './assets/Kimmich.jpg'},
      {nombre: 'Raheem Sterling', edad: 27, pais: 'Inglaterra', equipo: './assets/city.jpg', precio: 85, imagen: './assets/Sterling.jpg'},
      {nombre: 'Pedri', edad: 19, pais: 'España', equipo: './assets/barcelona.png', precio: 80, imagen: './assets/Pedri.jpg'},
      {nombre: 'Lautaro Martínez', edad: 24, pais: 'Argentina', equipo: './assets/inter.png', precio: 80, imagen: './assets/Lautaro.png'},
      {nombre: 'Alexander-Arnold', edad: 23, pais: 'Inglaterra', equipo: './assets/liverpool.png', precio: 80, imagen: './assets/AlexanderArnold.jpg'},
      {nombre: 'Jack Grealish', edad: 26, pais: 'Inglaterra', equipo: './assets/city.jpg', precio: 80, imagen: './assets/Grealish.jpg'},
      {nombre: 'Sadio Mané', edad: 29, pais: 'Senegal', equipo: './assets/liverpool.png', precio: 80, imagen: './assets/Mané.jpg'},
      {nombre: 'Heung-Min Son', edad: 29, pais: 'Corea del Sur', equipo: './assets/hotspur.png', precio: 80, imagen: './assets/Son.jpg'},
      {nombre: 'Cristiano Ronaldo', edad: 36, pais: 'Portugal', equipo: './assets/united.png', precio: 35, imagen: './assets/cristiano.jpg'},
      {nombre: 'Lionel Mesi', edad: 34, pais: 'Argentina', equipo: './assets/psg.png', precio: 60, imagen: './assets/messi.jpg'},
      {nombre: 'Robert Lewandowski', edad: 33, pais: 'Polonia', equipo: './assets/bayern.png', precio: 50, imagen: './assets/lewandowski.jpg'},
      {nombre: 'Karim Benzema', edad: 34, pais: 'Francia', equipo: './assets/realmadrid.png', precio: 25, imagen: './assets/benzema.jpg'},
      {nombre: 'Thibaut Courtouis', edad: 29, pais: 'Bélgica', equipo: './assets/realmadrid.png', precio: 65, imagen: './assets/courtouis.jpg'},
      {nombre: 'Fede Valverde', edad: 23, pais: 'Uruguay', equipo: './assets/realmadrid.png', precio: 65, imagen: './assets/fede.jpg'},
      {nombre: 'Joao Félix', edad: 22, pais: 'Portugal', equipo: './assets/atleti.png', precio: 60, imagen: './assets/joaofelix.jpg'},
      {nombre: 'Luka Modric', edad: 36, pais: 'Croacia', equipo: './assets/realmadrid.png', precio: 10, imagen: './assets/modric.jpg'},
      {nombre: 'Toni Kroos', edad: 32, pais: 'Alemania', equipo: './assets/realmadrid.png', precio: 25, imagen: './assets/kroos.jpeg'},
      {nombre: 'Eder Militao', edad: 23, pais: 'Brasil', equipo: './assets/realmadrid.png', precio: 60, imagen: './assets/militao.jpg'},
      {nombre: 'David Alaba', edad: 29, pais: 'Austria', equipo: './assets/realmadrid.png', precio: 55, imagen: './assets/alaba.jpeg'},
      {nombre: 'Alphonso Davies', edad: 21, pais: 'Canadá', equipo: './assets/bayern.png', precio: 70, imagen: './assets/davies.jpg'},
      {nombre: 'Dusan Vlahovic', edad: 21, pais: 'Serbia', equipo: './assets/fiorentina.png', precio: 70, imagen: './assets/vlahovic.jpg'},
      {nombre: 'Federico Chiesa', edad: 24, pais: 'Italia', equipo: './assets/juventus.png', precio: 70, imagen: './assets/chiesa.jpeg'},
      {nombre: 'Leroy Sané', edad: 26, pais: 'Alemania', equipo: './assets/bayern.png', precio: 70, imagen: './assets/sane.jpg'},
      {nombre: 'Ngolo Kanté', edad: 30, pais: 'Francia', equipo: './assets/chelsea.png', precio: 50, imagen: './assets/kante.jpg'},
      {nombre: 'Gianluigi Donnarumma', edad: 22, pais: 'Italia', equipo: './assets/psg.png', precio: 65, imagen: './assets/donnarumma.jpg'},
      {nombre: 'Ansu Fati', edad: 19, pais: 'España', equipo: './assets/barcelona.png', precio: 60, imagen: './assets/ansu.jpg'},
      {nombre: 'Marcos Llorente', edad: 26, pais: 'España', equipo: './assets/atleti.png', precio: 60, imagen: './assets/llorente.jpg'},
      {nombre: 'Virgil Van Dijk', edad: 30, pais: 'Países Bajos', equipo: './assets/liverpool.png', precio: 55, imagen: './assets/virgil.jpg'},
      {nombre: 'Sergio Ramos', edad: 35, pais: 'España', equipo: './assets/psg.png', precio: 8, imagen: './assets/ramos.jpg'}
    ]

    this.jugadoresYaSeleccionados = Object.assign([], this.jugadores);

    this.jugadorSeleccionado1 = this.jugadores[Math.floor(Math.random() * this.jugadores.length)];
    this.jugadoresPosibleComparacion = this.seleccionarJugadorCompararPrecio(this.jugadorSeleccionado1);
    this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];

    this.recordAciertosPrecio = this.comunicacionService.guardarRecordPrecio();
    if(this.recordAciertosPrecio < 1){
      this.recordAciertosPrecio = 0;
    }

    this.jugadorSeleccionado1 = this.jugadores[Math.floor(Math.random() * this.jugadores.length)];
    this.jugadoresPosibleComparacion = this.seleccionarJugadorCompararEdad(this.jugadorSeleccionado1);
    this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];

    this.recordAciertosEdad = this.comunicacionService.guardarRecordEdad();
    if(this.recordAciertosEdad < 1){
      this.recordAciertosEdad = 0;
    }

  }

  comparacionJugadoresMasPrecio(){
    this.mostrarVs = false;
    if(this.jugadorSeleccionado1.precio < this.jugadorSeleccionado2.precio){
      this.mostrarAcierto = true;
      this.contadorAciertos++;
      this.comunicacionService.crearContador(this.contadorAciertos);
      if(this.contadorAciertos > this.recordAciertosPrecio){
        this.comunicacionService.crearRecordPrecio(this.contadorAciertos);
        this.recordAciertosPrecio++;
      }
      this.jugadorSeleccionado1 = this.jugadorSeleccionado2;
      this.jugadoresPosibleComparacion = this.seleccionarJugadorCompararPrecio(this.jugadorSeleccionado1);
      this.borrarJugadorSeleccionado(this.jugadorSeleccionado1);
      this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];
      if(!this.jugadorSeleccionado2){
        this.route.navigateByUrl('resultado');
      }
    }else{
      this.route.navigateByUrl('resultado');
    }
  }

  comparacionJugadoresMenosPrecio(){
    this.mostrarVs = false;
    if(this.jugadorSeleccionado1.precio > this.jugadorSeleccionado2.precio){
      this.mostrarAcierto = true;
      this.contadorAciertos++;
      this.comunicacionService.crearContador(this.contadorAciertos);
      if(this.contadorAciertos > this.recordAciertosPrecio){
        this.comunicacionService.crearRecordPrecio(this.contadorAciertos);
        this.recordAciertosPrecio++;
      }
      this.jugadorSeleccionado1 = this.jugadorSeleccionado2;
      this.jugadoresPosibleComparacion = this.seleccionarJugadorCompararPrecio(this.jugadorSeleccionado1);
      this.borrarJugadorSeleccionado(this.jugadorSeleccionado1);
      this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];
      if(!this.jugadorSeleccionado2){
        this.route.navigateByUrl('resultado');
      }
    }else{
      this.route.navigateByUrl('resultado');
    }
  }

  comparacionJugadoresMasEdad(){
    this.mostrarVs = false;
    if(this.jugadorSeleccionado1.edad < this.jugadorSeleccionado2.edad){
      this.mostrarAcierto = true;
      this.contadorAciertos++;
      this.comunicacionService.crearContador(this.contadorAciertos);
      if(this.contadorAciertos > this.recordAciertosEdad){
        this.comunicacionService.crearRecordEdad(this.contadorAciertos);
        this.recordAciertosEdad++;
      }
      this.jugadorSeleccionado1 = this.jugadorSeleccionado2;
      this.jugadoresPosibleComparacion = this.seleccionarJugadorCompararEdad(this.jugadorSeleccionado1);
      this.borrarJugadorSeleccionado(this.jugadorSeleccionado1);
      this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];
      if(!this.jugadorSeleccionado2){
        this.route.navigateByUrl('resultado');
      }
    }else{
      this.route.navigateByUrl('resultado');
    }
  }

  comparacionJugadoresMenosEdad(){
    this.mostrarVs = false;
    if(this.jugadorSeleccionado1.edad > this.jugadorSeleccionado2.edad){
      this.mostrarAcierto = true;
      this.contadorAciertos++;
      this.comunicacionService.crearContador(this.contadorAciertos);
      if(this.contadorAciertos > this.recordAciertosEdad){
        this.comunicacionService.crearRecordEdad(this.contadorAciertos);
        this.recordAciertosEdad++;
      }
      this.jugadorSeleccionado1 = this.jugadorSeleccionado2;
      this.jugadoresPosibleComparacion = this.seleccionarJugadorCompararEdad(this.jugadorSeleccionado1);
      this.borrarJugadorSeleccionado(this.jugadorSeleccionado1);
      this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];
      if(!this.jugadorSeleccionado2){
        this.route.navigateByUrl('resultado');
      }
    }else{
      this.route.navigateByUrl('resultado');
    }
  }

  borrarJugadorSeleccionado(jugadorSeleccionado: Jugador){
    const index: number = this.jugadoresYaSeleccionados.indexOf(jugadorSeleccionado);
    if (index !== -1) {
      this.jugadoresYaSeleccionados.splice(index, 1);
    }       
  }

  seleccionarJugadorCompararPrecio(jugador1: Jugador){
    let posiblesJugadoresPrecio: Jugador[] = [];
    posiblesJugadoresPrecio = this.jugadoresYaSeleccionados.filter((jugador) => {
      return jugador1.precio != jugador.precio && jugador1.nombre != jugador.nombre;
    })
    return posiblesJugadoresPrecio;
  }

  seleccionarJugadorCompararEdad(jugador1: Jugador){
    let posiblesJugadoresEdad: Jugador[] = [];
    posiblesJugadoresEdad = this.jugadoresYaSeleccionados.filter((jugador) => {
      return jugador1.edad != jugador.edad && jugador1.nombre != jugador.nombre;
    })
    return posiblesJugadoresEdad;
  }

  volver(){
    localStorage.removeItem('comparadorPrecio');
    localStorage.removeItem('comparadorEdad');
    this.route.navigateByUrl('');
  }

}
