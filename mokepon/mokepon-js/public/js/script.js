// const => el valor no puede cambiar
// section reiniciar
const sectionRestart = document.getElementById("restart")
const restartButton = document.getElementById("btn-restart")

// Botones de ataque
const sectionSelectAttack = document.getElementById("select-attack")

// identifica el mokepon elegido
const mokeponCards = document.getElementById("cards-mokepon")
const attacksButtons = document.getElementById("attack-buttons")

const buttonSelectMokepon = document.getElementById("btn-mokepon")
const mokeponName = document.getElementById("mokepon-name")

// mokepon enemy
const mokeponEnemyName = document.getElementById("enemy-name")

// count lives
const mokeponPoints = document.getElementById("mokepon-lives")
const enemyPoints = document.getElementById("enemy-lives")

const hideAttackButtons = document.getElementById("attack-buttons")

const resultSection = document.getElementById("messages")

let mokepones = [] // arreglo, como no sabemos el contenido aun se declara vacio

// Game settings
// let => porque pueden cambiar su valor a lo largo de la ejecucion
let ataqueJugador
let ataqueEnemigo

let mokeponesOptions
let attacksOptions

let mokeponJugador

let buttonFire
let buttonWater
let buttonEarth

let inputHipodoge
let inputCapipepo
let inputRatigueya

let mokeponLives = 3
let enemigoLives = 3

// clase mokepon para definir la estructura y lo que esta por dentro
class Mokepon {
    constructor(name, photo, lives) { // no se pasan los ataque porque se definen despues
        this.name = name
        this.photo = photo
        this.lives = lives
        this.attacks = []
    }
}

// se crean los objetos y sus parametros
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)

// aca se definen los ataques usando el atributo attacks que esta vacio
hipodoge.attacks.push(
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '🌱', id: 'btn-earth' },
    { name: '🔥', id: 'btn-fire' },
)

capipepo.attacks.push(
    { name: '🌱', id: 'btn-earth' },
    { name: '🌱', id: 'btn-earth' },
    { name: '🌱', id: 'btn-earth' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
)

ratigueya.attacks.push(
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '💧', id: 'btn-water' },
    { name: '🌱', id: 'btn-earth' },
)

// aca se atribuyen a la clase con push
mokepones.push(hipodoge, capipepo, ratigueya)
// console.log(mokepones)

window.addEventListener("load", function() {

    sectionSelectAttack.style.display = "none" // Oculta la sección de ataques al cargar la página
    
    // para definir la lista dinamicamente en el html
    // por cada "mokepon definido arriba -> entonces agregar un html"
    mokepones.forEach((mokepon) => {
        
        // templates literarios
        // se le asigna el nombre y los atributos necesarios, por ahora solo nombre y foto, pero si hubieran mas se colocarian vidas, etc…
        mokeponesOptions = `
            <input type="radio" name="mokepon" id=${mokepon.name} />
            <label class="bg-indigo-600 text-white inline-flex border border-gray-300 p-8 rounded-lg m-4" for=${mokepon.name}>
                <p class="text-center content-center text-lg">${mokepon.name}</p>
                <img style="width:100px" src=${mokepon.photo}>
            </label>
        `

        // este los agrega todos con innerHTML
        mokeponCards.innerHTML += mokeponesOptions

        // este los encuentra para que funcione el evento clicked del input
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })
    
    console.log(mokepones)

    // Botón de selección de Mokepon
    buttonSelectMokepon.addEventListener("click", selectMokepon)
    
    // Botón de reinicio del juego
    sectionRestart.style.display = "none" // oculat el boton
    restartButton.addEventListener("click", restartGame) // reinicia el juevo

})

function selectMokepon() {
    
    // muestra la seccion de ataques cuando se selecciona al mokepon arriba
    sectionSelectAttack.style.display = "block"
    
    // esconde el boton de selectionar para evitar que cambien de mokepon
    buttonSelectMokepon.style.display = "none"
    
    // para asignarle el nombre al listado y se vea que mokepon se selecciono - funciona como guia
    if (inputHipodoge.checked) {
        // usando input.id trae el id del objecto sin necesidad de agregarlo manualmente 
        mokeponName.innerHTML = inputHipodoge.id
        mokeponJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        mokeponName.innerHTML = inputCapipepo.id
        mokeponJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        mokeponName.innerHTML = inputRatigueya.id
        mokeponJugador = inputRatigueya.id        
    } else {
        alert("Selecciona un Mokepon")
        location.reload()
    }
    // console.log(mokepones)

    // asignar el nomber a la funcion
    showAttacks(mokeponJugador)

    // ejecuta la funcion de eleccion de mokepon enemigo definida despues
    selectMokeponEnemy()
}

function showAttacks(mokeponJugador) {
    // hay que definir una variable para asignarle el resultado
    // que se va a encontrar durante el loop
    let attacks

    // i empieza en 0
    // mientras i sea menor que el largo del arreglo que queramos recorrer en este caso 3
    // suma 1 a i para volver a empezar
    // y se termina hasta que i sea igual al largo del arreglo

    for (let i = 0; i < mokepones.length; i++) {
        // entonces cuando el nombre elegido sea igual
        // al que se encuentre durante el loop
        // se va a cumplir la condicion
        if (mokeponJugador === mokepones[i].name) {
            // aca se le asigna ese valor a la variable que se definio al principio
            attacks = mokepones[i].attacks;
        }
    }

    showAttacksList(attacks)

    // console.log(mokepones)
    // console.log(attacks) // muestra los poderes
}

function showAttacksList(attacks) {

    attacks.forEach((attacks) => {
        attacksOptions = `
        
            <button id=${attacks.id} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">${attacks.name}</button>
        
        `

        attacksButtons.innerHTML += attacksOptions
        
    })

    buttonFire = document.getElementById("btn-fire")
    buttonWater = document.getElementById("btn-water")
    buttonEarth = document.getElementById("btn-earth")

    buttonEarth.addEventListener("click", earthAttack)
    buttonWater.addEventListener("click", waterAttack)
    buttonFire.addEventListener("click", fireAttack)
 
}

function selectMokeponEnemy() {

    // asigna un mokepon aleatorio al enemigo
    aleatorioMokepon = aleatorio(0, mokepones.length -1)

    // no se le asigna a la variable sino que se le agrega el resultado
    mokeponEnemyName.innerHTML = mokepones[aleatorioMokepon].name

    // desabilita las opciones de arriba para que no lo cambien ya que no funcionan
    inputHipodoge.disabled = true
    inputCapipepo.disabled = true
    inputRatigueya.disabled = true

    console.log("Algo???????")
}

// se define la funcion de ataque y se le asigna a la variable definida al principio para todos los ataques disponibles
// adentro se define el ataque aleatorio para el enemigo

function fireAttack() {
    ataqueJugador = "FUEGO 🔥"
    console.log("Ataque del jugador: " + ataqueJugador)
    
    ataqueAleatorioEnemigo()
}

function waterAttack() {
    ataqueJugador = "AGUA 💧"
    console.log("Ataque del jugador: " + ataqueJugador)
    
    ataqueAleatorioEnemigo()
}

function earthAttack() {
    ataqueJugador = "TIERRA 🌱"
    console.log("Ataque del jugador: " + ataqueJugador)
   
    ataqueAleatorioEnemigo()
}

// selection aleatoria de ataque igual que la del mokepon
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "FUEGO 🔥"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = " AGUA 💧"
    } else {
        ataqueEnemigo = "TIERRA 🌱"
    }

    console.log("Ataque del enemigo: " + ataqueEnemigo)

    // ya como los mokepones y los ataques estan seleccionados se ejecuta la funcion de batalla
    battle()
}

function battle() {


    // se calculan los resultados dependiendo de la seleccion de los ataques
    if (ataqueJugador == ataqueEnemigo) {
        messageResult("Empate")
    } else if (
        (ataqueJugador == "FUEGO 🔥" && ataqueEnemigo == "TIERRA 🌱") ||
        (ataqueJugador == " AGUA 💧" && ataqueEnemigo == "FUEGO 🔥") ||
        (ataqueJugador == "TIERRA 🌱" && ataqueEnemigo == " AGUA 💧")) {
        messageResult("Ganaste!!!")

        // restar una vida al enemigo
        enemigoLives--
        enemyPoints.innerHTML = enemigoLives
    } else {
        messageResult("Perdiste :'(")

        // restar una vida al jugador
        mokeponLives--
        mokeponPoints.innerHTML = mokeponLives
    }

    console.log("algo???")

    // cuenta las vidas de acuerdo a las combinaciones
    livesCount()
}

function livesCount() {

    if (enemigoLives == 0) {
        battleEnd("Felicidades, ganaste el juego!!!")

        hideAttackButtons.style.display = "none"
        sectionRestart.style.display = "block"

    } else if (mokeponLives == 0) {
        battleEnd("Lo siento, perdiste el juego :'(")

        hideAttackButtons.style.display = "none"
        sectionRestart.style.display = "block"
    }
    
}

function messageResult(battleResult) {
    let message = document.createElement("p")
    
    message.innerHTML = "Tu mascota atacó con " + ataqueJugador + " y el enemigo con " + ataqueEnemigo + ". " + battleResult

    // agrega el mensaje al elemento seleccionado
    resultSection.appendChild(message) 
}

function battleEnd(finalResult) {
    let message = document.createElement("p")
    
    message.innerHTML = finalResult
    resultSection.appendChild(message) 
}

function restartGame() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}