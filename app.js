
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
const LAST_LEVEL = 8;
const show_modal = document.querySelector(".show_modal")
const modal_container = document.querySelector(".modal_container")
const modal_body = document.querySelector(".modal_body")
const close_modal = document.getElementById("close_modal")
const btnSound = document.querySelector(".grid-btn .btn-sound");
const audio = document.querySelector("audio");
const overlay_image = document.getElementById("overlay_image")
const wrapper_image = document.getElementById("wrapper_image")
const about = document.getElementById('about')
const modal_about = document.querySelector('.modal_about')
const close_btn = document.querySelector('.close_btn')
// const back_img1 = document.getElementById("back_image1")
const modal_background = document.getElementById('modal_background')
// const modalImages = ["./images/copy8.png","./images/10.png","./images/61.png","./images/5.png","./images/9.png","./images/12.png","./images/11.png","./images/1.png","./images/4.png"]
const modalImages = ["./images/12.png","./images/61.png","./images/63.png","./images/5.png","./images/9.png","./images/12.png","./images/11.png","./images/62.png","./images/4.png"]
let index = 0;

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
    // console.log("========> start to play <=======");
    this.level = 1;
    
    this.sounds = {
      blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      violet: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      orange: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
      green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    }

    this.soundsWinLose = {
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

  generateSoundsWinLose(color){
    switch (color) {
      case 'lose':
        this.soundsWinLose.sound_lose.play();
        break;
      case 'win':
        this.soundsWinLose.sound_win.play();
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
      // console.log("color iluminate", color)
     
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
    // console.log("show background image")
    const className = document.getElementsByClassName("light")
    for (let index = 0; index < className.length; index++) {
      const element = className[index];
      element.classList.remove('hide-bg')
      // document.querySelector(".light").classList.add('hide-bg');
      // console.log("element", element.classList.remove('hide-bg'))
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

  //Cuando manejamos los escuchadores de eventos se usa un Metodo llamado 'ev'
  chooseColor(ev){
   //console.log(this) // el this sigue siendo el mismo nuevo objeto play
    // console.log(ev);
    //Que color dio click al usuario y el numero del color 
    const colorName = ev.target.dataset.color;
    // console.log("color", colorName)
    const colorNumber = this.transformColorToNumber(colorName)
    this.iluminateColor(colorName);
    document.querySelector(".light").classList.add('hide-bg');
    // console.log("color click", colorNumber)

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
          // console.log("You WON")
        }else{ //y si no es el ultimo nivel tiene que avanzar el siguiente nivel
          setTimeout(() => {this.nextLevel()}, 1500);
          // setTimeout(this.nextLevel, 1500) // no estamos invocando la funcion lo estamos llamando
        }
      }
    }else{
      this.lose();
      // this.increaseLevel(1);
      // this.increaseNumberPoints(1);
      // console.log("You LOSE")
      // if (sound) {
      //   audio.pause();
      //   audio.currentTime = 0;
      // }
    } 
  }

  //Alert you Won
  win(){
    if (sound) {
      audio.pause();
      audio.currentTime = 0;
      this.generateSoundsWinLose('win')
    }
    overlay_image.style.display = 'block';
    wrapper_image.style.display = 'block';
    // setTimeout(() => {
    // }, 2500);

    show_modal.classList.add('active')
    show_modal.style.opacity = '1'
    modal_body.innerHTML = `
      <div class="header_top">
        <div class="level">
          <h2>L<span>evel</span></h2>
          <p>${levels.length + 1}</p>
        </div>
        <div class="level">
          <h2>P<span>oint</span></h2>
          <p>${ratings.length}</p>
        </div>
      </div>
      <h1>Congratulations. Simon says, You won champion.</h1>
      <img id="winner" class="winner" src="./assets/gif/6ob.gif" alt="winner">
      <img id="winner" class="winner" src="./assets/gif/6ob.gif" alt="winner">
      <footer class="footer_modal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
        <a href="https://github.com/brunomaldonado/Simon-says" target="_blank"> Rigoberto Bruno Mdo. </a>
      </footer>
  `;
    close_modal.addEventListener("click", event => {
      console.log("click button closes");
      this.deleteClickEvent();
      this.initialize();
      this.increaseLevel(1);
      this.increaseNumberPoints(1);
      // show_modal.style.display = 'none';
      show_modal.classList.remove('active')
      show_modal.style.opacity = '0'
      btnPlay.classList.remove('hide');
      levels.length = 0;
      ratings.length = 0;
    });
    show_modal.addEventListener('click', event => {
      if (event.target === show_modal) {
        this.removeModal();
      };
    });
  }
//Alert you lost
  lose(){
    if (sound) {
        audio.pause();
        audio.currentTime = 0;
        this.generateSoundsWinLose('lose')
      }
    overlay_image.style.display = 'none';
    wrapper_image.style.display = 'none';
    about.classList.remove('active')

    show_modal.classList.add('active')
    show_modal.style.opacity = '1'
    modal_body.innerHTML = `
      <div class="header_top">
        <div class="level">
          <h2>L<span>evel</span></h2>
          <p>${levels.length + 1}</p>
        </div>
        <div class="level">
          <h2>P<span>oint</span></h2>
          <p>${ratings.length}</p>
        </div>
      </div>
      <h1 class="title_modal">You Lost Champion.</h1>
      <img id="loser" class="loser" src="./assets/gif/DE4.gif" alt="loser">
      <footer class="footer_modal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
        <a href="https://github.com/brunomaldonado/Simon-says" target="_blank"> Rigoberto Bruno Mdo. </a>
      </footer>
  `;

    close_modal.addEventListener("click", event => {
      console.log("click button closes");
      this.deleteClickEvent();
      this.initialize();
      this.increaseLevel(1);
      this.increaseNumberPoints(1);
      show_modal.classList.remove('active')
      show_modal.style.opacity = '0'
      // show_modal.style.display = 'none';
      btnPlay.classList.remove('hide');
      levels.length = 0;
      ratings.length = 0;
    });
    show_modal.addEventListener('click', event => {
      if (event.target === show_modal) {
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
    show_modal.classList.remove('active')
    show_modal.style.opacity = '0'
    console.log("remove modal")
    this.increaseLevel(1);
    this.increaseNumberPoints(1);
    this.deleteClickEvent();
    this.initialize();
    levels.length = 0;
    ratings.length = 0;
    btnPlay.classList.remove('hide');
  }
}

btnSound.addEventListener("click", function () {
  sound = !sound;
  console.log("sound", sound)
  const ariaLabel =
    this.getAttribute("aria-label") == "Enable sound"
      ? "Disable sound"
      : "Enable sound";
  this.setAttribute("aria-label", ariaLabel);
  this.classList.toggle("btn-sound-off");
});

about.addEventListener('click', function(event) {
  // background_users.src = usersImages[index]; 
  
  modal_about.classList.add('active')
  about.classList.add('active')
  modal_about.style.opacity = '1'
  index++;
  index = index % modalImages.length;
  modal_background.src = modalImages[index]; 
  modal_background.style.display = 'block'
});

close_btn.addEventListener('click', function(event){
  modal_about.classList.remove('active')
  modal_about.style.opacity = '0'
  console.log("close modal about")
})

window.addEventListener('click', function (event) {
  if (event.target === modal_about) {
  modal_about.classList.remove('active')
  modal_about.style.opacity = '0'
  }
  // if (event.target === show_modal) {
  //   show_modal.classList.remove('active')
  //   show_modal.style.opacity = '0'
  //   }
});

function startGame(){
  window.play = new Play()
}

