# definicion de variables
@ataque_jugador = nil
@ataque_enemigo = nil

@vidas_jugador = 3
@vidas_enemigo = 3

# definicion de mokepones
mokepones = {
    "Hipodoge" => {
        tipos: "Agua",
        vidas: 3,
        ataque: "Agua"
    },
    "Capipepo" => {
        tipos: "Tierra",
        vidas: 3,
        ataque: "Tierra"        
    },
    "Ratigueya" => {
        tipos: "Fuego",
        vidas: 3,
        ataque: "Fuego"
    }
    # "Langostelus" => {
    #     tipos: ["Agua", "Fuego"],
    #     vidas: 4
    # },
    # "Tucapalma" => {
    #     tipos: ["Agua", "Tierra"],
    #     vidas: 4
    # },
    # "Pydos" => {
    #     tipos: ["Fuego", "Tierra"],
    #     vidas: 4
    # }
}

# definicion de ataques
attacks = {
    1 => "Fuego",
    2 => "Agua",
    3 => "Tierra"
}

def resultado(ataque_jugador, ataque_enemigo)
        if ataque_jugador == ataque_enemigo
            puts "Empate"
        elsif ataque_jugador == 1 && ataque_enemigo == 3 || ataque_jugador == 2 && ataque_enemigo == 1 || ataque_jugador == 3 && ataque_enemigo == 2
            puts "Ganaste!!!"
            @vidas_enemigo -= 1
        else
            puts "Perdiste una vida :'("
            @vidas_jugador -= 1
        end
    end

puts "Elige tu mokepon"
mokepones.each do |name, props|
    puts "Mokepon: #{name} -> Ataque: #{props[:ataque]}"
end
    
puts "Escribe el nombre de tu mokepon"
@jugador = gets.chomp

@mokepon_enemigo = mokepones.keys.sample # keys.sample selecciona un elemento aleatorio de un hash en este caso de mokepones

while @vidas_jugador > 0 && @vidas_enemigo > 0
   
    puts "Elige un ataque"
    @ataque_jugador = gets.chomp.to_i

    @ataque_enemigo = rand(1..3) # seleccion aleatoria de ataque enemigo

    
    puts "Tu mokepon: #{@jugador}, ataque: #{attacks[@ataque_jugador]} / Mokepon enemigo: #{@mokepon_enemigo}, ataque: #{attacks[@ataque_enemigo]}"
    puts resultado(@ataque_jugador, @ataque_enemigo)

end


puts "Tus vidas: #{@vidas_jugador} / Enemigo: #{@vidas_enemigo}"

# puts attacks[3]
# puts mokepones["Capipepo"]