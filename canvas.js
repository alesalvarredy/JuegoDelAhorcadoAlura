const ahorcado_uno=document.querySelector(".ahorcado_uno");
const ahorcado_dos=document.querySelector(".ahorcado_dos");
const ahorcado_tres=document.querySelector(".ahorcado_tres");
const ahorcado_cuatro=document.querySelector(".ahorcado_cuatro");
const ahorcado_cinco=document.querySelector(".ahorcado_cinco");
const ahorcado_seis=document.querySelector(".ahorcado_seis");
const ahorcado_siete=document.querySelector(".ahorcado_siete");
const ahorcado_ocho=document.querySelector(".ahorcado_ocho");
const ahorcado_nueve=document.querySelector(".ahorcado_nueve");

function dibujarCanvas() {
    tablero.lineWidth=8;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.fillStyle= "#0B5345";
    tablero.strokeStyle = "#0B5345";
    tablero.fillRect(0,0,1200,800);
    tablero.beginPath();
    tablero.moveTo(650,500);
    tablero.lineTo(900,500);
    tablero.stroke();
    tablero.closePath();
  }

  function dibujarLinea() {
    tablero.lineWidth = 6;
    tablero.lineCap ="round";
    tablero.lineJoin ="round";
    tablero.fillStyle = "#FFFFFF";
    tablero.strokeStyle = "#FFFFFF";

    let ancho=600/palabraSecreta.length;
    for (let i = 0 ; i < palabraSecreta.length ; i++){
      tablero.moveTo(500 + (ancho*i), 640);
      tablero.lineTo(550 + (ancho*i), 640);
    }
    tablero.stroke();
    tablero.closePath();
  }
  function escribirLetraCorrecta(index) {
    tablero.font = 'bold 63px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.fillStyle= "#FFFFFF";
    let ancho = 600/palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 505 + (ancho*index),620);
    tablero.stroke();
  }

  function escribirLetraIncorrecta(letra, errorsLeft) {
    tablero.font = 'bold 40px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap ="round";
    tablero.lineJoin ="round";
    tablero.fillStyle ="#FFFFFF"
    tablero.fillText(letra,535+(40*(10-errorsLeft)),710,40)
  }

  function dibujarAhorcado(puntaje) {
    tablero.lineWidth=8
    tablero.lineCap="round"
    tablero.lineJoin="round"
    tablero.strokeStyle = "#FFFFFF"
    if(puntaje===8){
    ahorcado_uno.classList.add("active");
    }
    if(puntaje===7){
    ahorcado_uno.classList.remove("active");
    ahorcado_dos.classList.add("active");
    } else if(puntaje===6){
    ahorcado_dos.classList.remove("active");
    ahorcado_tres.classList.add("active");
    } else if(puntaje===5){
    ahorcado_tres.classList.remove("active");
    ahorcado_cuatro.classList.add("active");
    } else if(puntaje===4){
    ahorcado_cuatro.classList.remove("active");
    ahorcado_cinco.classList.add("active");
    } else if(puntaje===3){
    ahorcado_cinco.classList.remove("active");
    ahorcado_seis.classList.add("active");
    } else if(puntaje===2){
    ahorcado_seis.classList.remove("active");
    ahorcado_siete.classList.add("active");
    } else if(puntaje===1){
    ahorcado_siete.classList.remove("active");
    ahorcado_ocho.classList.add("active");
    }else if (puntaje===0){
    ahorcado_ocho.classList.remove("active");
    ahorcado_nueve.classList.add("active")
    }
  }
 
  function perdiste() {
    Swal.fire({ 
      title: "Perdiste!",
      icon: "error",
      confirmButtonColor:"#0B5345",
    }
    )
  }

  function ganaste() {
    Swal.fire({ 
      title: "Ganaste!",
      icon: "success",
      confirmButtonColor:"#0B5345",
    }
    )
  }   