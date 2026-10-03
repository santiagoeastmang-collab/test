const express = require("express")
const cors = require("cors")

const app = express()

// se crea la variable de jugadores vacia para luego agregarlos
const jugadores = []
// const attacks = []

// classe para definir la estructura de los jugadores
class Jugador {
    constructor(id) {
        this.id = id
    }

    // asignar al jugador un mokepon
    assignMokepon(mokepon) {
        this.mokepon = mokepon
    }

    assignUsedAttacks() {
        this.attacks = this.attacks
    }

    updateCoordinates(x, y) {
        this.x = x
        this.y = y
    }

}

class Mokepon {
    constructor(name, attacks) {
        this.name = name
        this.attacks = []
    }

    assignAttacks(attacks) {
        this.attacks = attacks
    }
}

app.use(express.static('public'))

app.use(cors())
app.use(express.json())

app.get("/join", (req, res) => {
    // genera un id aleatorio
    const id = `${Math.random().toString(36).substring(2,18)}`

    // se crea el nuevo jugador
    const jugador = new Jugador(id)

    // se envia ese nuego jugador al arreglo 
    jugadores.push(jugador)

    console.log(jugadores)
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    
    // se extra lo que viene en la url apartir de req
    const jugadorId =  req.params.jugadorId || ""
    const mokeponName = req.body.mokepon || ""
    const attackList = req.body.attacks || ""

    const mokepon = new Mokepon(mokeponName)

    mokepon.assignAttacks(attackList)

    // para encontrar el indice dentro de un arreglo
    // y poder asignarlo a una variable
    // jugador = cada elemento en la lista
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].assignMokepon(mokepon)
    }
    
    console.log(jugadores)
    // console.log(jugadores[jugadorIndex].mokepon.attacks)

    res.end()
    
})

app.post("/mokepon/:jugadorId/attacks", (req, res) => {
    
    // se extra lo que viene en la url apartir de req
    const jugadorId =  req.params.jugadorId || ""
    const attacksUsed = req.body.attacks || ""

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].assignUsedAttacks(attacksUsed)
    }
    
    console.log(attacksUsed)

    res.end()
    
})

app.post("/mokepon/:jugadorId/coordinates", (req, res) => {
    // para recibir las coordenadas del jugador
    const jugadorId =  req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].updateCoordinates(x, y)
    }

    // para filtrar todos los jugadores
    // parecida a find
    // mokepones.find((mokepon) => mokepon.name === mokeponEnemy.name)
    const players = jugadores.filter((player) => jugadorId != player.id)

    res.send({
        players
    })
    
})

app.get("/mokepon/:jugadorId/attacks", (req, res) => {
    const jugadorId =  req.params.jugadorId || ""

    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)

    console.log("Algo? " + jugador)
    res.send({
        attacks: jugador.attacks || []
    })

})

app.listen(8080, () => {
    console.log("arranque")
})