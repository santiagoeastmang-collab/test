// const => el valor no puede cambiar
// section reiniciar
const sectionRestart = document.getElementById("restart")
const restartButton = document.getElementById("btn-restart")

// section mokepones
const mokeponViewSection = document.getElementById("select-mokepon")

// Botones de ataque
const sectionSelectAttack = document.getElementById("select-attack")

// identifica el mokepon elegido
const mokeponCards = document.getElementById("cards-mokepon")
const attacksButtons = document.getElementById("attack-buttons")

const buttonSelectMokepon = document.getElementById("btn-mokepon")
const mokeponName = document.getElementById("mokepon-name")


const totalWinsMokepon = document.getElementById("victorias-mokepon")
const totalEnemyWins = document.getElementById("victorias-enemigo")

// mokepon enemy
const mokeponEnemyName = document.getElementById("enemy-name")

// count lives
const mokeponPoints = document.getElementById("mokepon-attacks")
const enemyPoints = document.getElementById("enemy-attacks")

const hideAttackButtons = document.getElementById("attack-buttons")

const resultSection = document.getElementById("messages")


// section mapa
const mapSectionView = document.getElementById("ver-mapa")
const map = document.getElementById("mapa")

let lienzo = map.getContext("2d")
let interval

const mapBackground = new Image()
mapBackground.src = './assets/mokemap.png'

const buttonLeft = document.getElementById("button-left")
const buttonUp = document.getElementById("button-up")
const buttonDown = document.getElementById("button-down")
const buttonRight = document.getElementById("button-right")


let jugadorId = null

let mokepones = [] // arreglo, como no sabemos el contenido aun se declara vacio
let objetoMokepon

// Game settings
// let => porque pueden cambiar su valor a lo largo de la ejecucion
let ataqueJugador = []
let ataqueEnemigo = []
let jugadorWins = 0
let enemigoWins = 0

let mokeponesOptions
let attacksOptions
let attacks

let attackSequence = []

let mokeponJugador
let mokeponAttacksEnemy

let buttonFire
let buttonWater
let buttonEarth

let inputHipodoge
let inputCapipepo
let inputRatigueya

let mokeponLives = 5
let enemigoLives = 5


// para guardar los index de los ataques
let indexJugador
let indexEnemigo

// clase mokepon para definir la estructura y lo que esta por dentro
class Mokepon {
    constructor(name, photo, lives, photoMap, x = 10, y = 10 ) { // no se pasan los ataque porque se definen despues
        this.name = name
        this.photo = photo
        this.lives = lives
        this.attacks = []
        this.width = 60
        this.height = 60
        this.x = x
        this.y = y
        this.mapPhoto = new Image()
        this.mapPhoto.src = photoMap
        this.speedX = 0
        this.speedY = 0
    }

    drawMokepon() {
        lienzo.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

// se crean los objetos y sus parametros
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")

// mokepones enemigos
let hipodogeEnemy = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png", 340, 130)
let capipepoEnemy = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png", 130, 34)
let ratigueyaEnemy = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png", 23, 220)

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

    mapSectionView.style.display = "none"
    
    // para definir la lista dinamicamente en el html
    // por cada "mokepon definido arriba -> entonces agregar un html"
    mokepones.forEach((mokepon) => {
        
        // templates literarios
        // se le asigna el nombre y los atributos necesarios, por ahora solo nombre y foto, pero si hubieran mas se colocarian vidas, etc…
        mokeponesOptions = `
            <input type="radio" name="mokepon" id=${mokepon.name} />
            <label class="flex justify-center bg-indigo-600 text-white border border-gray-300 p-8 rounded-lg m-4" for=${mokepon.name}>
                <p class="text-lg content-center">${mokepon.name}</p>
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

    // joinGame()

})

// function joinGame() {
//     // obtiene la url que queremos visitar
//     fetch("http://localhost:8080/join")
//         // luego de obtener la respuesta, entonces ejecutamos algo
//         .then(function (response) {
//             console.log(response)
//             // si la respuesta fue correcta entonces ejecutamos algo adicional
//             if(response.ok) {
//                 response.text()
//                     .then(function (respuesta) {
//                         console.log(respuesta)
//                         jugadorId = respuesta
//                     })
//             }
//         })
// }

function selectMokepon() {
    
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

    // asignar el nombre a la funcion y asigna attackes para poder enviarlos al backend
    // let attacks = showAttacks(mokeponJugador)
    // selectedMokepon(mokeponJugador, attacks)
    // selectedMokepon(mokeponJugador)

    showAttacks(mokeponJugador)

    startMap()

    window.addEventListener("keydown", keyPressed)
    window.addEventListener("keyup", stopMove)

}

function showAttacks(mokeponJugador) {
    // hay que definir una variable para asignarle el resultado
    // que se va a encontrar durante el loop
    // let attacks

    // find busca un elemendo tendro del arreglo 
    // mokepon es la variable que quiera, puede ser cualquier nombre 
    // en este caso como estamos hablando de un mokepon
    // tiene sentido que se llame asi porque queremos encontrar un atributo en este caso el nombre
    // cuando lo encuentre se le va a asignar a el jugador
    // del mismo objecto podemos encontrar los ataques 

    objetoMokepon = mokepones.find((mokepon) => mokepon.name === mokeponJugador)
    attacks = objetoMokepon.attacks

    // i empieza en 0
    // mientras i sea menor que el largo del arreglo que queramos recorrer en este caso 3
    // suma 1 a i para volver a empezar
    // y se termina hasta que i sea igual al largo del arreglo

    // for (let i = 0; i < mokepones.length; i++) {
    //     // entonces cuando el nombre elegido sea igual
    //     // al que se encuentre durante el loop
    //     // se va a cumplir la condicion
    //     if (mokeponJugador === mokepones[i].name) {
    //         // aca se le asigna ese valor a la variable que se definio al principio
    //         attacks = mokepones[i].attacks;

    //         objectoMokepon = mokepones[i]
    //     }
    // }

    showAttacksList(attacks)

    console.log(objetoMokepon.photo)
    console.log(attacks) // muestra los poderes
    // return attacks
}

function showAttacksList(attacks) {

    attacks.forEach((attacks) => {
        attacksOptions = `
            <button id=${attacks.id} class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-4 px-8 m-4 rounded-md attack-sequence">${attacks.name}</button>
        `

        attacksButtons.innerHTML += attacksOptions
        
    })

    buttonFire = document.getElementById("btn-fire")
    buttonWater = document.getElementById("btn-water")
    buttonEarth = document.getElementById("btn-earth")
    
    attackSequence = document.querySelectorAll('.attack-sequence')

    // para obtener el arreglo con los botones para agregarle el evento
    // y los ataques seleccionados
    console.log(attackSequence)
    
}

// function selectedMokepon(mokeponJugador, attacks) {
//     fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
//         method: "post",
//         headers: {
//             "Content-Type" : "application/json"
//         },
//         body: JSON.stringify({
//             mokepon: mokeponJugador,
//             attacks: attacks
//         })
//     })

//     console.log(jugadorId + mokeponJugador + attacks)
// }

// para definir la secuencia de juego

function battleSequence () {

    attackSequence.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.innerHTML === "🔥") {
                
                ataqueJugador.push('FUEGO')
                button.disabled = true
                button.className = "bg-indigo-200 text-white font-bold py-4 px-8 m-4 rounded"
                console.log("ataque jugador: " + ataqueJugador)

            } else if (e.target.innerHTML === "💧") {

                ataqueJugador.push('AGUA')
                button.disabled = true
                button.className = "bg-indigo-200 text-white font-bold py-4 px-8 m-4 rounded"
                console.log("ataque jugador: " + ataqueJugador)

            } else {

                ataqueJugador.push('TIERRA')
                button.disabled = true
                button.className = "bg-indigo-200 text-white font-bold py-4 px-8 m-4 rounded"
                console.log("ataque jugador: " + ataqueJugador)

            }

            mokeponLives--
            console.log(mokeponLives)
            mokeponPoints.innerHTML = mokeponLives
            ataqueAleatorioEnemigo()
            // console.log(e)
        })
    })

}

function selectMokeponEnemy(enemy) {

    // asigna un mokepon aleatorio al enemigo
    // aleatorioMokepon = aleatorio(0, mokepones.length -1)

    mokeponEnemy = enemy

    // no se le asigna a la variable sino que se le agrega el resultado
    mokeponEnemyName.innerHTML = mokeponEnemy.name

    const enemyAttacks = mokepones.find((mokepon) => mokepon.name === mokeponEnemy.name)

    mokeponAttacksEnemy = enemyAttacks.attacks

    // desabilita las opciones de arriba para que no lo cambien ya que no funcionan
    inputHipodoge.disabled = true
    inputCapipepo.disabled = true
    inputRatigueya.disabled = true

    console.log("mokepon enemigo, " + mokeponAttacksEnemy.length)

    battleSequence()
}

// selection aleatoria de ataque igual que la del mokepon
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, mokeponAttacksEnemy.length -1)
    // listado de ataques del mokepon enemigo
    console.log("ataque enemigo: " + mokeponAttacksEnemy[ataqueAleatorio].name)
    // console.log(mokeponAttacksEnemy)
    

    // mejor para usar los ataque disponibles para el mokepon seleccionado
    if (mokeponAttacksEnemy[ataqueAleatorio].name === "🔥") {
        ataqueEnemigo.push("FUEGO")
    } else if (mokeponAttacksEnemy[ataqueAleatorio].name === "💧") {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }

    // para eliminar del array la opcion ya seleccionada por el enemigo
    mokeponAttacksEnemy.splice(ataqueAleatorio, 1);

    console.log(mokeponAttacksEnemy.length)
    // ya como los mokepones y los ataques estan seleccionados se ejecuta la funcion de batalla
    startBattle()
}

function startBattle () {
    if (ataqueJugador.length === 5) {
        battle()
    }
}

function attacksIndex(jugador, enemigo) {
    indexJugador = ataqueJugador[jugador]
    indexEnemigo = ataqueEnemigo[enemigo]

    // console.log(indexJugador + indexEnemigo)
}

function battle() {

    // for para recorrer todo el arreglo de los ataques
    // para luego definir como se comparan
    for (let index = 0; index < ataqueJugador.length; index++) {

        // solo calcula cuando es empate
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            console.log("empate:" + ataqueJugador[index])
            console.log("empate:" + ataqueEnemigo[index])

            attacksIndex(index, index)
            // messageResult("Empate")
        } else if (
            (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") ||
            (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") ||
            (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA")
        ) {
            // attacksIndex(index, index)
            jugadorWins++

            console.log("Ganaste" + ataqueJugador[index])
            console.log("Perdio enemigo" + ataqueEnemigo[index])          

        } else {
            // messageResult("Perdiste :'(")
            console.log("Perdiste" + ataqueJugador[index])
            console.log("Gano enemigo" + ataqueEnemigo[index])
            
            enemigoWins++
            console.log("puntaje enemigo" + enemigoWins)

        }
    }

    livesCount()    
}

function livesCount() {
    let message = document.createElement("p")

    if (jugadorWins == enemigoWins) {
        message.innerHTML = "fue un empate"
    } else if (jugadorWins > enemigoWins) {
         message.innerHTML = "Ganaste"
    } else {
         message.innerHTML = "Perdiste"
    }
    // battleEnd("Felicidades, ganaste el juego!!!")
    // console.log(ataqueEnemigo)
    hideAttackButtons.style.display = "none"
    sectionRestart.style.display = "block"

    resultSection.appendChild(message)

    totalEnemyWins.innerHTML = enemigoWins
    totalWinsMokepon.innerHTML = jugadorWins
    
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

function startMap(){
    // map view
    map.width = 480
    map.height = 320

    mokeponViewSection.style.display = "none"
    mapSectionView.style.display = "flex"

    interval = setInterval(drawCanvas, 50)
}

function drawCanvas() {

    objetoMokepon.x = objetoMokepon.x + objetoMokepon.speedX
    objetoMokepon.y = objetoMokepon.y + objetoMokepon.speedY
    lienzo.clearRect(0,0, map.clientWidth, map.clientHeight)

    // pintar el fondo
    lienzo.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )

    objetoMokepon.drawMokepon()

    hipodogeEnemy.drawMokepon(x = 100, y = 120)
    capipepoEnemy.drawMokepon(x = 100, y = 120)
    ratigueyaEnemy.drawMokepon(x = 100, y = 120)

    if (objetoMokepon.speedX !== 0 || objetoMokepon.speedY !==0) {
        // collisionMokepon(mokeponEnemy)
        collisionMokepon(capipepoEnemy)
        collisionMokepon(ratigueyaEnemy)
        collisionMokepon(hipodogeEnemy)
    }
    
}

function moveUp() {
    objetoMokepon.speedY = -5
    buttonUp.style.background = "oklch(79.5% 0.184 86.047)"
}

function moveDown() {
    objetoMokepon.speedY = 5
    buttonDown.style.background = "oklch(79.5% 0.184 86.047)"
}

function moveLeft() {
    objetoMokepon.speedX = -5
    buttonLeft.style.background = "oklch(79.5% 0.184 86.047)"
}

function moveRight() {
    objetoMokepon.speedX = 5
    buttonRight.style.background = "oklch(79.5% 0.184 86.047)"
}

function stopMove() {
    objetoMokepon.speedX = 0
    objetoMokepon.speedY = 0
    buttonUp.style.background = "oklch(92.9% 0.013 255.508)"
    buttonDown.style.background = "oklch(92.9% 0.013 255.508)"
    buttonRight.style.background = "oklch(92.9% 0.013 255.508)"
    buttonLeft.style.background = "oklch(92.9% 0.013 255.508)"
}

function collisionMokepon(enemy) {

    // para definir las condiciones de la colision
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    const leftEnemy = enemy.x

    // para definir las condiciones de la colision
    const mokeponUp = objetoMokepon.y
    const mokeponDown = objetoMokepon.y + objetoMokepon.height
    const mokeponRight = objetoMokepon.x + objetoMokepon.width
    const mokeponLeft = objetoMokepon.x

    if(
        mokeponDown < upEnemy ||
        mokeponUp > downEnemy ||
        mokeponRight < leftEnemy ||
        mokeponLeft > rightEnemy
    ) {
        return 
    } 

    stopMove()

    alert("a pelear!!! ")

    mapSectionView.style.display ="none"

    // muestra la seccion de ataques cuando se selecciona al mokepon arriba
    sectionSelectAttack.style.display = "block"

    // ejecuta la funcion de eleccion de mokepon enemigo definida despues
    selectMokeponEnemy(enemy)

}

function keyPressed(event){
    switch (event.key) {
        case "ArrowUp":
            moveUp()
            break;
        case "ArrowDown":
            moveDown()
            break
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
        default:
            break;
    }
}