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
let enemyId = null

let mokepones = [] // arreglo, como no sabemos el contenido aun se declara vacio
let activeEnemies = []
let mokeponEnemy 
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
    constructor(name, photo, lives, photoMap, id = null) { // no se pasan los ataque porque se definen despues
        this.id = id
        this.name = name
        this.photo = photo
        this.lives = lives
        this.attacks = []
        this.width = 60
        this.height = 60
        this.x = aleatorio(0,  map.width - this.width )
        this.y = aleatorio(0,  map.height - this.height )
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

    joinGame()

})

function joinGame() {

    // obtiene la url que queremos visitar
    // hace llamado GET por defecto
    fetch("http://localhost:8080/join")
        // luego de obtener la respuesta, entonces ejecutamos algo
        // por eso no se asigna una variable porque es asincrono
        // y no se sabe cuando se va a ejecutar
        // solo se ejecuta cuando se obtiene respuesta "res"
        .then(function (response) {
            console.log(response)
            
            // si la respuesta fue correcta entonces ejecutamos algo adicional
            if(response.ok) {
                // se optiene el texto de esa respuesta
                // en este caso es el ID que se configuro en index.js /join
                response.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        // para asignar el jugador ID desde la respuesta
                        // este se usa despues en => /mokepon/jugadorId
                        jugadorId = respuesta
                    })
            }
        })
}

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
        return
    }
    // console.log(mokepones)

    showAttacks(mokeponJugador)
    // asignar el nombre a la funcion y asigna attackes para poder enviarlos al backend
    // let attacks = showAttacks(mokeponJugador)
    selectedMokepon(mokeponJugador, attacks)


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

function selectedMokepon(mokeponJugador, attacks) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        // se le asigna el metodo post porque se estan enviando los datos
        method: "post",
        // tipo de datos que se van a enviar
        // con tipo de contenido
        headers: {
            "Content-Type" : "application/json"
        },
        // se genera el body con formato json
        // cuales son los valores que se van a enviar
        body: JSON.stringify({
            mokepon: mokeponJugador,
            attacks: attacks
        })
    })

    console.log(jugadorId + mokeponJugador + attacks)
}

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
            console.log("Lista de ataques: " + ataqueJugador)
            mokeponPoints.innerHTML = mokeponLives
            
            if(ataqueJugador.length === 5) {
                sendUsedAttacks()
            }
            // ataqueAleatorioEnemigo()
            // console.log(e)
        })
    })

}

function sendUsedAttacks() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: ataqueJugador
        })
    })

    interval = setInterval(getAttacks, 50)
}

function getAttacks() {
    console.log("getAttacks se ejecutó")

    fetch(`http://localhost:8080/mokepon/${enemyId}/attacks`) 
    .then(function (response) {
        console.log("respuesta:", response)
        if (response.ok) {
            return response.json()
            .then(function (data) {
                // if ()
                console.log("data completa: " + JSON.stringify({data}))
                console.log("data attacks: " + data.attacks)
                    if (data.attacks.length === 5) {
                        // console.log("ataques recibidos:", attacks)
    
                        ataqueEnemigo = data.attacks
                        battle()
                    }
            })
            // .then(function ({ attacks }) {
            // })
        }
    })
}

function selectMokeponEnemy(enemy) {

    mokeponEnemy = enemy

    console.log("Enemigo?: " + JSON.stringify({mokeponEnemy}))

    // no se le asigna a la variable sino que se le agrega el resultado
    mokeponEnemyName.innerHTML = mokeponEnemy.name

    // const enemyAttacks = mokepones.find((mokepon) => mokepon.name === mokeponEnemy.name)

    mokeponAttacksEnemy = mokeponEnemy.attacks

    console.log("mokepon enemigo, " + mokeponAttacksEnemy)

    battleSequence()
}

// selection aleatoria de ataque igual que la del mokepon
function ataqueAleatorioEnemigo() {
    
    // listado de ataques del mokepon enemigo
    let ataqueAleatorio = aleatorio(0, mokeponAttacksEnemy.length -1)
    // console.log("ataque enemigo: " + mokeponAttacksEnemy[ataqueAleatorio].name)

    const usedAttack = mokeponAttacksEnemy[0]
    const index = mokeponAttacksEnemy.indexOf(usedAttack)

    // mejor para usar los ataque disponibles para el mokepon seleccionado
    if (ataqueAleatorio === "🔥") {
        ataqueEnemigo.push("FUEGO")
    } else if (ataqueAleatorio === "💧") {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }

    // para eliminar del array la opcion ya seleccionada por el enemigo
    mokeponAttacksEnemy.splice(index, 1);

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

    clearInterval(interval)

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

    // por cada uno de los enemigos en la lista, se ejecuta el drawMokepon
    // para que aparezcan en el mapa

    activeEnemies.forEach(function (mokepon) {
        mokepon.drawMokepon()
        collisionMokepon(mokepon)
    })
    
    console.log(activeEnemies)

    sendCoordinates(objetoMokepon.x, objetoMokepon.y)
    // console.log(objetoMokepon.x, objetoMokepon.y)
    
}

function sendCoordinates(x, y) {

    fetch(`http://localhost:8080/mokepon/${jugadorId}/coordinates`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // si la variable se le asigna el mismo valor no es necesario
            // agregarle el : 
            x,
            y
        })
    })
    .then(function (response) {
        if(response.ok) {
            response.json()
                .then(function ({ players }) {
                    console.log(players)
                    activeEnemies = players.map(function(player)  {
                        const mokeponName = player.mokepon.name || ""
                        console.log(mokeponName)

                    //     let mokeponEnemySelected = null

                        if(mokeponName == "Hipodoge") {
                            mokeponEnemySelected = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png", player.id)
                        } else if (mokeponName == "Capipepo") {
                            mokeponEnemySelected = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png", player.id)
                        } else {
                            mokeponEnemySelected = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png", player.id)
                        }


                        // se le asignan otros valores que no esten en el new Mokepon
                        mokeponEnemySelected.attacks = player.mokepon.attacks

                        mokeponEnemySelected.x = player.x
                        mokeponEnemySelected.y = player.y

                        return mokeponEnemySelected
                    })
                    console.log(activeEnemies)

                })
        }
    })
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

    clearInterval(interval)

    enemyId = enemy.id

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