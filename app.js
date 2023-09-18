
// swal.fire({
//   title: 'Welcome to this App',
//   text: 'Memoriza el orden en que se iluminan la paleta de colores y repite el orden, supera los niveles champions',
//   background: '#000',
//   grow: 'fullscreen',
//   background: '#045f',
//   backdrop: true,

// })

// document.getElementById('dateCreate').innerHTML = `Created: May 05, 2021`

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
const show_modal = document.querySelector(".show_modal")
const modal_container = document.querySelector(".modal_container")
const modal_body = document.querySelector(".modal_body")
const close_modal = document.getElementById("close_modal")
const btnSound = document.querySelector(".grid-btn .btn-sound");
const audio = document.querySelector("audio");
const overlay_image = document.getElementById("overlay_image")
const wrapper_image = document.getElementById("wrapper_image")
// const back_img1 = document.getElementById("back_image1")

let sound = false;
let timer;
let levels = [];
let ratings = [];

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
      // document.querySelector(".light").classList.add('show-bg');
      console.log("color iluminate", color)
     
      // LLamar la funcion para que ilumine ese color 
      // setTimeout(() =>this.generateSoundsColor(color), 1000 * i);
      if (sound) {
        // document.querySelector(".light").classList.add('show-bg');
        const duration = setTimeout(() =>this.generateSoundsColor(color), 1000 * i);
        // console.log("duration", duration)
        clearTimeout(timer)
        audio.play()
        timer = setTimeout(() => {
          audio.pause()
        }, duration);
      }
      setTimeout(() =>  this.iluminateColor(color), 1000 * i);
      time ++;
    }
    setTimeout(() =>this.colorClickEvent(), 700 * time)
  }

  iluminateColor(color){
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color) , 350);
    console.log("show background image")
    const className = document.getElementsByClassName("light")
    for (let index = 0; index < className.length; index++) {
      const element = className[index];
      element.classList.remove('hide-bg')
      // document.querySelector(".light").classList.add('hide-bg');
      console.log("element", element.classList.remove('hide-bg'))
    }
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
    //Que color dio click al usuario y el numero del color 
    const colorName = ev.target.dataset.color;
    // console.log("color", colorName)
    const colorNumber = this.transformColorToNumber(colorName)
    this.iluminateColor(colorName);
    document.querySelector(".light").classList.add('hide-bg');
    console.log("color click", colorNumber)

    if (colorNumber === this.sequence[this.subLevel]) {
      // document.querySelector(".light").classList.remove('hide-bg');
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
      this.lose();
      // this.increaseLevel(1);
      // this.increaseNumberPoints(1);
      console.log("You LOSE")
      if (sound) {
        audio.pause();
        audio.currentTime = 0;
      }
    } 
  }

  //Alert you Won
  win(){
    // this.generateSounds('win')
    overlay_image.style.display = 'block';
    wrapper_image.style.display = 'block';

    show_modal.style.display = 'block';
    modal_container.style.display = 'block';
    modal_body.style.display = 'visible';
    modal_body.innerHTML = `
      <div class="header_top">
        <div class="level">
          <h2>Level</h2>
          <p>${levels.length + 1}</p>
        </div>
        <div class="level">
          <h2>Points</h2>
          <p>${ratings.length}</p>
        </div>
      </div>
      <h1>Congratulations. Simon says, You won champion.</h1>
      <img id="winner" class="winner" src="./assets/gif/6ob.gif" alt="winner">
      <img id="winner" class="winner" src="./assets/gif/6ob.gif" alt="winner">
  `;
    close_modal.addEventListener("click", event => {
      console.log("click button closes");
      this.deleteClickEvent();
      this.initialize();
      this.increaseLevel(1);
      this.increaseNumberPoints(1);
      show_modal.style.display = 'none';
      btnPlay.classList.remove('hide');
      levels.length = 0;
      ratings.length = 0;
      if (event.target.className == 'show_modal') {
        this.removeModal();
      }
    });
    show_modal.addEventListener('click', event => {
      if (event.target.className === 'show_modal') {
        this.removeModal();
      };
    });
    // close_modal.addEventListener("click", () => {
    //   console.log("click button closes");
    //   this.deleteClickEvent();
    //   this.initialize();
    //   this.increaseLevel(1);
    //   this.increaseNumberPoints(1);
    //   show_modal.style.display = 'none';
    //   btnPlay.classList.remove('hide');
    //   levels.length = 0;
    //   ratings.length = 0;
    // });
    // show_modal.addEventListener('click', event => {
    //   if (event.target.className === 'show_modal') {
    //     this.removeModal();
    //   };
    // });
  }
//Alert you lost
  lose(){
    // this.generateSounds('lose')
    overlay_image.style.display = 'none';
    wrapper_image.style.display = 'none';

    show_modal.style.display = 'block';
    modal_container.style.display = 'block';
    modal_body.style.display = 'visible';
    modal_body.innerHTML = `
      <div class="header_top">
        <div class="level">
          <h2>Level</h2>
          <p>${levels.length + 1}</p>
        </div>
        <div class="level">
          <h2>Points</h2>
          <p>${ratings.length}</p>
        </div>
      </div>
      <h1 class="title_modal">You Lost Champion.</h1>
      <img id="loser" class="loser" src="./assets/gif/DE4.gif" alt="loser">
  `;

    close_modal.addEventListener("click", event => {
      console.log("click button closes");
      this.deleteClickEvent();
      this.initialize();
      this.increaseLevel(1);
      this.increaseNumberPoints(1);
      show_modal.style.display = 'none';
      btnPlay.classList.remove('hide');
      levels.length = 0;
      ratings.length = 0;
      if (event.target.className == 'show_modal') {
        this.removeModal();
      }
    });
    show_modal.addEventListener('click', event => {
      if (event.target.className === 'show_modal') {
        this.removeModal();
      };
    });
  }

  increaseNumberPoints(reboot){
    var points = document.getElementById('points');
    var numberPoints = points.innerHTML;
    (reboot) ? numberPoints = 0 : numberPoints ++;
    points.innerHTML = numberPoints;
    // console.log("Points", numberPoints)
    ratings.push(numberPoints);
  }

  increaseLevel(reboot){
    var level = document.getElementById('level');
    var number = level.innerHTML;
    (reboot) ? number = 0 : number ++;
    level.innerHTML = number;
    // console.log("levels", number)
    levels.push(number);
  }

  removeModal() {
    show_modal.style.display = 'none';
    console.log("remove modal")
    this.increaseLevel(1);
    this.increaseNumberPoints(1);
    this.deleteClickEvent();
    this.initialize();
    levels.length = 0;
    ratings.length = 0;
    btnPlay.classList.remove('hide');
    // const modal = document.querySelector(".show_modal");
    // if (modal) {
    //   modal.remove()
    //   console.log("remove modal")
    //   this.increaseLevel(1);
    //   this.increaseNumberPoints(1);
    //   this.deleteClickEvent();
    //   this.initialize();
    //   levels.length = 0;
    //   ratings.length = 0;
    //   btnPlay.classList.remove('hide');
    // }
  }
}

btnSound.addEventListener("click", function () {
  sound = !sound;
  const ariaLabel =
    this.getAttribute("aria-label") == "Enable sound"
      ? "Disable sound"
      : "Enable sound";
  this.setAttribute("aria-label", ariaLabel);
  this.classList.toggle("btn-sound-off");
});

function startGame(){
  window.play = new Play()
}

