
// swal.fire({
//   title: 'Welcome to this App',
//   background: '#000',
//   grow: 'fullscreen',
// })

document.getElementById('dateCreate').innerHTML = `Created: May 05, 2021`

function generateTime(){
  let timeNow = new Date();

  let hours = timeNow.getHours().toString().length < 2 ? "0" + timeNow.getHours() : timeNow.getHours();
  let minutes = timeNow.getMinutes().toString().length < 2 ? "0" + timeNow.getMinutes() : timeNow.getMinutes();
  let seconds = timeNow.getSeconds().toString().length < 2 ? "0" + timeNow.getSeconds() : timeNow.getSeconds();

  let mainTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById('time').innerHTML = mainTime;
}

setInterval(() => {
  generateTime();
}, 1000);

let date = new Date();
document.getElementById('date').innerHTML = date.toDateString();

const blue = document.getElementById('blue');
const violet = document.getElementById('violet');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const btnPlay= document.getElementById('btnPlay');
const sound_lose = document.getElementById('sound_lose');
const sound_win = document.getElementById('sound_win');
const LAST_LEVEL = 7;

const sounds = {
  blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  violet: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  orange: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
}

// la clase play sera la logica del  juego
class Play{ 
  constructor(){
    // creamos la funcion inicializar 
    this.initialize();
    this.generateSequence();
    setTimeout(() => {this.nextLevel()}, 800);
  }

  initialize(){
    this.nextLevel = this.nextLevel.bind(this); // simpre va estar atada al juego no importa que llame un setTimeout
    this.chooseColor = this.chooseColor.bind(this) // simpre va estar atada al juego

    //toggle significa despues de un switch o interruptor 
    this.toggleBtnStart();
    // btnPlay.classList.toggle('hide');
    console.log("========> start to play <=======");
    this.level = 1;
    
    this.sounds = {
      blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      violet: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      orange: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
      green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    }

    this.sounndsLoseWin = {
      sound_lose, sound_win
    }

    // Guardamos los colores 
    this.colors = {
      blue,
      violet,
      orange,
      green
    }
  }

  toggleBtnStart(){
    if (btnPlay.classList.contains('hide')) {
      btnPlay.classList.remove('hide');
    } else {
      btnPlay.classList.add('hide');
    }
  }

  generateSounds(color){
    switch (color) {
      case 'lose':
        this.sounndsLoseWin.sound_lose.play();
        break;
      case 'win':
        this.sounndsLoseWin.sound_win.play();
        break;
    }
  }

  generateSequence(){
    //define la secuencia internamente en un atributo del juego del objeto
    this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    // console.log(this.sequence);
  }
  //  Va a iluminar secuencia cada vez que pase al siiguiente nivel
  nextLevel(){
    this.subLevel = 0;
    // para agregar atributo siempre es this.nombreAtributo = 'valor';
    this.iluminateSequence();
    // Agrega los eventos de click a los botones de colores
    this.colorClickEvent();
  }

  //Metodo de transformar un numeor a color
  transformNumberToColor(number){
    switch (number) {
      case 0:
        return 'blue';
      case 1:
        return 'violet';
      case 2:
        return 'orange';
      case 3:
        return 'green';
    }
  }
//Metodo transformar color  a numero
  transformColorToNumber(color){
    switch (color) {
      case  'blue':
        return 0;
      case  'violet':
        return 1;
      case 'orange':
        return 2;
      case 'green':
        return 3;
    }
  }

  generateSoundsColor(color){
    switch (color) {
      case 'blue':
        this.sounds.blue.play();   
        break;
      case 'violet':
        this.sounds.violet.play();
        break;
        case 'orange':
        this.sounds.orange.play();   
        break;
      case 'green':
        this.sounds.green.play();
        break;
    }
  }

  // Este metodo va a recorrer el array de la secuencia hasta el nivel del usuario.
  iluminateSequence(){
    let time = 0;
    for (let i = 0; i < this.level ; i++) {
      const color = this.transformNumberToColor(this.sequence[i]);
      // LLamar la funcion para que ilumine ese color 
      setTimeout(() =>this.generateSoundsColor(color), 1000 * i);
     setTimeout(() =>  this.iluminateColor(color), 1000 * i);
     time ++;
    //  console.log(color)
    }
    setTimeout(() =>this.colorClickEvent(), 700 * time)
  }

  iluminateColor(color){
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color) , 350);
  }

  turnOffColor(color){
    this.colors[color].classList.remove('light')
  }

  // Agregar evento click de los cololres
  colorClickEvent(){
    // var _this = this
    // var selft = this
    // this.colors.blue.addEventListener('click', this.chooseColor.bind(selft)); //bind(this) bind significa atar o enlazar
    this.colors.blue.addEventListener('click', this.chooseColor)
    this.colors.violet.addEventListener('click', this.chooseColor)
    this.colors.orange.addEventListener('click', this.chooseColor)
    this.colors.green.addEventListener('click', this.chooseColor)
  }

  deleteClickEvent(){
    this.colors.blue.removeEventListener('click', this.chooseColor)
    this.colors.violet.removeEventListener('click', this.chooseColor)
    this.colors.orange.removeEventListener('click', this.chooseColor)
    this.colors.green.removeEventListener('click', this.chooseColor)
  } // Cuando el usuario pase de nivel, se van a volve agregar los eventos del clic

  //Cuando manejamos los agragadores o escuchadores de eventos se usa un Metodo llamado 'ev'
  chooseColor(ev){
   //console.log(this) // el this sigue siendo el mismo nuevo objeto play
    // console.log(ev);
    //Que boton o color dio click al usuario y el numeor del color
    const colorName = ev.target.dataset.color;
    const colorNumber = this.transformColorToNumber(colorName)
    this.iluminateColor(colorName);

    if (colorNumber === this.sequence[this.subLevel]) {
      //metodo o funcion para incrementear puntos.
      this.increaseNumberPoints();
      this.subLevel++;
      if (this.subLevel === this.level) {
        //Metodo para incrementar nivel
        this.increaseLevel();
        this.level++;
        // eliminar los eventos del click ==> si el usuario pasa el siguiente nivel el ya no tiene que seguir seleccionando colores con el metodo deleteClickEvent()
        this.deleteClickEvent()
        if (this.level === (LAST_LEVEL + 1)) {
          this.win();
          this.increaseLevel(1);
          console.log("You WON")
        }else{ //y si no es el ultimo nivel tiene que avanzar el siguiente nivel
          setTimeout(() => {this.nextLevel()}, 1500);
          // setTimeout(this.nextLevel, 1500) // no estamos invocando la funcion lo estamos llamando
        }
      }
    }else{
      this.increaseLevel(1);
      this.increaseNumberPoints(1);
      this.lose();
      console.log("You LOST")
    } 
  }
  //Alert you Won
  win(){
    Swal.fire({
      title: 'Simon says champions',
      html: '<b class="won">You WON</b>',
      icon: 'success',
      backdrop: true,
      buttonsStyling: true,
      showConfirmButton: false,
      // timer: 2500,
      // timerProgressBar: true,
    })
      .then(() => {this.initialize()})
      // .then(this.generateSounds('win'))
  }
//Alert you lost
  lose(){
    this.generateSounds('lose')
    Swal.fire({
      title: 'Simon says champions',
      html: '<b class="lost">You LOST</b>',
      icon: 'error',
      backdrop: true,
      showConfirmButton: false,
      // timer: 2500,
      // timerProgressBar: true,
    })
      .then(() => {
        this.deleteClickEvent();
        this.initialize();
      })
  }

  increaseNumberPoints(reboot){
    var points = document.getElementById('points');
    var numberPoints = points.innerHTML;
    (reboot) ? numberPoints = 0 : numberPoints ++;
    points.innerHTML = numberPoints;
  }

  increaseLevel(reboot){
    var level = document.getElementById('level');
    var number = level.innerHTML;
    (reboot) ? number = 0 : number ++;
    level.innerHTML = number;
  }
}

function startGame(){
  window.play = new Play()
}

