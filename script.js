const btn_play = document.querySelector("#start_game");
const btn_add_principal = document.querySelector("#button_add-word");
const btn_return = document.querySelector("#button_return");
const btn_add = document.querySelector("#btn_add");
const btn_new_game = document.querySelector(".button_new-game");
const btn_desist = document.querySelector(".button_desist");
const container_principal = document.querySelector("#principal_desaparecer");
const container_add = document.querySelector("#aparecer_add");
const container_play = document.querySelector("#aparecer_canvas");
const imagenes = document.querySelector(".imagenes");
const ahorcado_img = document.querySelectorAll(".ahorcado_img");

let palabras=["JAVA", "JAVASCRIPT", "PYTHON","HTML","CANVAS","COBOL", "RUBY","KOTLIN","PASCAL", "REACT", "TECLADO", "MOUSE", "MONITOR",
"NOTEBOOK", "SERVER", "GIT", "GITHUB", "ALURA", "ORACLE", "ONE" ];
let tablero = document.getElementById("horca").getContext("2d");
let palabraSecreta = "";
let letras = [];
let palabraCorrecta = [];
let errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8;
let letraElegida = [];

//se muestra pantalla para agregar palabra
function screen_add(){
    container_principal.classList.add("active");
    container_add.classList.add("active");
}


//muetra nuevamente pantalla inicial desde pantalla agregar
btn_return.addEventListener("click", function () {
    location.reload();
  });

//recarga partida CHEQUEAR
btn_new_game.addEventListener("click", function(){
    // location.reload();
    letras = [];
    errores=8;
    palabraCorrecta = [];
    letrasIncorrectas = [];
    numeroDeErrores = 8;
    letraElegida = [];
    ahorcado_img.forEach(element => {
      element.classList.remove("active");
    });
    Swal.fire({ 
      title: "Nueva partida cargada correctamente",
      icon: "success",
      confirmButtonColor:"#0B5345",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    }
    )

    setTimeout(() => {
      comenzarJuego();
    }, 300);

})

//desisitir partida, muestra pantalla principal
btn_desist.addEventListener("click", function(){
  
  Swal.fire({ 
    title: "La palabra secreta era: " + palabraSecreta,
    icon: "warning",
    confirmButtonColor:"#0B5345",
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
  }
  )
    setTimeout(() => {
      location.reload();
    }, 1500);
    
})


//sorteo palabra secreta
function sortearPalabra(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra;
    console.log(palabraSecreta);
}

//captura letras ingresadas
function comprobarLetraIngresada (key){
    if (letras.length < 1 || letras.indexOf(key) < 0) {
        letras.push(key);
        return false ;
      } else {
        letras.push(key)
        return true;
      }
    }

function adicionarLetraIncorrecta(letter){
    if (palabraSecreta.indexOf(letter) <= 0) {
        errores -= 1;
    }
}

function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase();
  }



  function partidaPerdida(letra) {
   if(letraElegida.length < palabraSecreta.length) { 
      letrasIncorrectas.push(letra);
      
      if (letrasIncorrectas.length > numeroDeErrores) {
        perdiste()
      }
      else if(letraElegida.length < palabraSecreta.length) {
        adicionarLetraIncorrecta(letra)
        escribirLetraIncorrecta(letra, errores)
      }
    }
   } 
  
function partidaGanada(letra) {
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length) {
      ganaste();
    }
}

//verifica que no se ingresen numeros u otras teclas
function verificarLetra(keyCode) {

    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }

  }


//captura palabra escrita
function guardarPalabra() {

    let nuevaPalabra = document.getElementById("add_new-word").value;

    if(nuevaPalabra.length < 3){
      Swal.fire({ 
        title: "La palabra debe contener al menos tres letras",
        icon: "warning",
        confirmButtonColor:"#0B5345",
      }
      )
      return false;
    } else if(nuevaPalabra !== ""){
      palabras.unshift(nuevaPalabra.toUpperCase());
      Swal.fire({ 
        title: "Palabra guardada con exito",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }
      )
      setTimeout(() => {
        comenzarJuego();
        container_add.classList.remove("active"); 
      }, 2000);
    }else{
        Swal.fire({ 
            title: "Por favor ingrese la palabra",
            icon: "error",
            confirmButtonColor:"#0B5345",
          }
          )
          return;
    }
    console.log(nuevaPalabra);
}

// al click hace que se guarde la palabra
document.getElementById("btn_add").onclick = () => {
    guardarPalabra();
    
    }



//inicia el juego
function comenzarJuego(){
    container_principal.classList.add("active");
    container_play.classList.add("active");

    sortearPalabra();
    dibujarCanvas();
    dibujarLinea();

    document.onkeydown = (e) => {
        let letra = e.key.toUpperCase();
        comprobarLetraIngresada(letra);

        if (letrasIncorrectas.length <= numeroDeErrores) {
            if (!comprobarLetraIngresada(e.key) && verificarLetra(e.keyCode)) {
              if (palabraSecreta.includes(letra)) {
                adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                for (let i = 0; i < palabraSecreta.length; i++) {
                  if (palabraSecreta[i] === letra) {
                    escribirLetraCorrecta(i)
                    partidaGanada(letra)
      
                  }
                }
      
              } else {
                if (!comprobarLetraIngresada(e.key) && !partidaGanada(letra)) return
                dibujarAhorcado(errores)
                partidaPerdida(letra)
              }
            }
          }
        };
      }
      