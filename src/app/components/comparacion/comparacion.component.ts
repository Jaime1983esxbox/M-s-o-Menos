import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  recordAciertos: number = 0;

  constructor(private comunicacionService: ComunicacionService, private route: Router) { }

  ngOnInit(): void {
    this.jugadores = [
      {nombre: 'Kylian Mbappé', pais: 'Francia', equipo: './assets/psg.png', precio: 160, imagen: './assets/mbappe.jpg'},
      {nombre: 'Erling Haaland', pais: 'Noruega', equipo: './assets/dortmund.png', precio: 150, imagen: './assets/haaland.jpg'},
      {nombre: 'Vinicius Jr', pais: 'Brasil', equipo: './assets/realmadrid.png', precio: 100, imagen: './assets/Vinicius.jpg'},
      {nombre: 'Mohamed Salah', pais: 'Egipto', equipo: './assets/liverpool.png', precio: 100, imagen: './assets/Salah.jpg'},
      {nombre: 'Harry Kane', pais: 'Inglaterra', equipo: './assets/hotspur.png', precio: 100, imagen: './assets/Kane.jpg'},
      {nombre: 'Romelu Lukaku', pais: 'Bélgica', equipo: './assets/chelsea.png', precio: 100, imagen: './assets/lukaku.jpg'},
      {nombre: 'Bruno Fernandes', pais: 'Portugal', equipo: './assets/united.png', precio: 90, imagen: './assets/BrunoFernandes.jpg'},
      {nombre: 'Kevin De Bruyne', pais: 'Bélgica', equipo: './assets/city.jpg', precio: 90, imagen: './assets/DeBruyne.jpg'},
      {nombre: 'Neymar', pais: 'Brasil', equipo: './assets/psg.png', precio: 90, imagen: './assets/Neymar.jpg'},
      {nombre: 'Phil Foden', pais: 'Inglaterra', equipo: './assets/city.jpg', precio: 85, imagen: './assets/Foden.jpg'},
      {nombre: 'Jadon Sancho', pais: 'Inglaterra', equipo: './assets/united.png', precio: 85, imagen: './assets/Sancho.jpg'},
      {nombre: 'Marcus Rashford', pais: 'Inglaterra', equipo: './assets/united.png', precio: 85, imagen: './assets/Rashford.jpg'},
      {nombre: 'Joshua Kimmich', pais: 'Alemania', equipo: './assets/bayern.png', precio: 85, imagen: './assets/Kimmich.jpg'},
      {nombre: 'Raheem Sterling', pais: 'Inglaterra', equipo: './assets/city.jpg', precio: 85, imagen: './assets/Sterling.jpg'},
      {nombre: 'Pedri', pais: 'España', equipo: './assets/barcelona.png', precio: 80, imagen: './assets/Pedri.jpg'},
      {nombre: 'Lautaro Martínez', pais: 'Argentina', equipo: './assets/inter.png', precio: 80, imagen: './assets/Lautaro.png'},
      {nombre: 'Alexander-Arnold', pais: 'Inglaterra', equipo: './assets/liverpool.png', precio: 80, imagen: './assets/AlexanderArnold.jpg'},
      {nombre: 'Jack Grealish', pais: 'Inglaterra', equipo: './assets/city.jpg', precio: 80, imagen: './assets/Grealish.jpg'},
      {nombre: 'Sadio Mané', pais: 'Senegal', equipo: './assets/liverpool.png', precio: 80, imagen: './assets/Mané.jpg'},
      {nombre: 'Heung-Min Son', pais: 'Corea del Sur', equipo: './assets/hotspur.png', precio: 80, imagen: './assets/Son.jpg'},
      {nombre: 'Cristiano Ronaldo', pais: 'Portugal', equipo: './assets/united.png', precio: 35, imagen: './assets/cristiano.jpg'},
      {nombre: 'Lionel Mesi', pais: 'Argentina', equipo: './assets/psg.png', precio: 60, imagen: './assets/messi.jpg'},
      {nombre: 'Robert Lewandowski', pais: 'Polonia', equipo: './assets/bayern.png', precio: 50, imagen: './assets/lewandowski.jpg'},
      {nombre: 'Karim Benzema', pais: 'Francia', equipo: './assets/realmadrid.png', precio: 25, imagen: './assets/benzema.jpg'},
      {nombre: 'Thibaut Courtouis', pais: 'Bélgica', equipo: './assets/realmadrid.png', precio: 65, imagen: './assets/courtouis.jpg'},
      {nombre: 'Fede Valverde', pais: 'Uruguay', equipo: './assets/realmadrid.png', precio: 65, imagen: './assets/fede.jpg'},
      {nombre: 'Joao Félix', pais: 'Portugal', equipo: './assets/atleti.png', precio: 60, imagen: './assets/joaofelix.jpg'},
      {nombre: 'Luka Modric', pais: 'Croacia', equipo: './assets/realmadrid.png', precio: 10, imagen: './assets/modric.jpg'},
      {nombre: 'Toni Kroos', pais: 'Alemania', equipo: './assets/realmadrid.png', precio: 25, imagen: './assets/kroos.jpeg'},
      {nombre: 'Eder Militao', pais: 'Brasil', equipo: './assets/realmadrid.png', precio: 60, imagen: './assets/militao.jpg'},
      {nombre: 'David Alaba', pais: 'Austria', equipo: './assets/realmadrid.png', precio: 55, imagen: './assets/alaba.jpeg'},
      {nombre: 'Alphonso Davies', pais: 'Canadá', equipo: './assets/bayern.png', precio: 70, imagen: './assets/davies.jpg'},
      {nombre: 'Dusan Vlahovic', pais: 'Serbia', equipo: './assets/fiorentina.png', precio: 70, imagen: './assets/vlahovic.jpg'},
      {nombre: 'Federico Chiesa', pais: 'Italia', equipo: './assets/juventus.png', precio: 70, imagen: './assets/chiesa.jpeg'},
      {nombre: 'Leroy Sané', pais: 'Alemania', equipo: './assets/bayern.png', precio: 70, imagen: './assets/sane.jpg'},
      {nombre: 'Ngolo Kanté', pais: 'Francia', equipo: './assets/chelsea.png', precio: 50, imagen: './assets/kante.jpg'},
      {nombre: 'Gianluigi Donnarumma', pais: 'Italia', equipo: './assets/psg.png', precio: 65, imagen: './assets/donnarumma.jpg'},
      {nombre: 'Ansu Fati', pais: 'España', equipo: './assets/barcelona.png', precio: 60, imagen: './assets/ansu.jpg'},
      {nombre: 'Marcos Llorente', pais: 'España', equipo: './assets/atleti.png', precio: 60, imagen: './assets/llorente.jpg'},
      {nombre: 'Virgil Van Dijk', pais: 'Países Bajos', equipo: './assets/liverpool.png', precio: 55, imagen: './assets/virgil.jpg'},
      {nombre: 'Sergio Ramos', pais: 'España', equipo: './assets/psg.png', precio: 8, imagen: './assets/ramos.jpg'}
    ]

    this.jugadoresYaSeleccionados = Object.assign([], this.jugadores);

    this.jugadorSeleccionado1 = this.jugadores[Math.floor(Math.random() * this.jugadores.length)];
    this.jugadoresPosibleComparacion = this.seleccionarJugadorComparar(this.jugadorSeleccionado1);
    this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];

    this.recordAciertos = this.comunicacionService.guardarRecord();
    if(this.recordAciertos < 1){
      this.recordAciertos = 0;
    }

  }

  comparacionJugadoresMas(){
    this.mostrarVs = false;
    if(this.jugadorSeleccionado1.precio < this.jugadorSeleccionado2.precio){
      this.mostrarAcierto = true;
      this.contadorAciertos++;
      this.comunicacionService.crearContador(this.contadorAciertos);
      if(this.contadorAciertos > this.recordAciertos){
        this.comunicacionService.crearRecord(this.contadorAciertos);
        this.recordAciertos++;
      }
      this.jugadorSeleccionado1 = this.jugadorSeleccionado2;
      this.jugadoresPosibleComparacion = this.seleccionarJugadorComparar(this.jugadorSeleccionado1);
      this.borrarJugadorSeleccionado(this.jugadorSeleccionado1);
      this.jugadorSeleccionado2 = this.jugadoresPosibleComparacion[Math.floor(Math.random() * this.jugadoresPosibleComparacion.length)];
      if(!this.jugadorSeleccionado2){
        this.route.navigateByUrl('resultado');
      }
    }else{
      this.route.navigateByUrl('resultado');
    }
  }

  comparacionJugadoresMenos(){
    this.mostrarVs = false;
    if(this.jugadorSeleccionado1.precio > this.jugadorSeleccionado2.precio){
      this.mostrarAcierto = true;
      this.contadorAciertos++;
      this.comunicacionService.crearContador(this.contadorAciertos);
      if(this.contadorAciertos > this.recordAciertos){
        this.comunicacionService.crearRecord(this.contadorAciertos);
        this.recordAciertos++;
      }
      this.jugadorSeleccionado1 = this.jugadorSeleccionado2;
      this.jugadoresPosibleComparacion = this.seleccionarJugadorComparar(this.jugadorSeleccionado1);
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

  seleccionarJugadorComparar(jugador1: Jugador){
    let posiblesJugadores: Jugador[] = [];
    posiblesJugadores = this.jugadoresYaSeleccionados.filter((jugador) => {
      return jugador1.precio != jugador.precio && jugador1.nombre != jugador.nombre;
    })
    return posiblesJugadores;
  }

}
