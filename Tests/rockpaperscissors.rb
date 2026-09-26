# 1 piedra, 2 papel, 3 tijera
jugador = 0
pc = 0
@wins = 0
@losses = 0
@draws = 0

options = {
    1 => "Piedra",
    2 => "Papel",
    3 => "Tijera"
}

# no se necesita definir el metodo en el while 

def resultado(jugador, pc)
    if jugador == pc
        puts "Empate"
        @draws += 1
    elsif jugador == 1 && pc == 3 || jugador == 2 && pc == 1 || jugador == 3 && pc == 2
        puts "Ganaste!!!"
        @wins += 1
    else
        puts "Perdiste :'("
        @losses += 1
    end
end

while @wins < 2 && @losses < 2

    pc = rand(1..3)

    puts "Elige un numero: 1 piedra, 2 papel, 3 tijera."
    jugador = gets.chomp.to_i
    # si la opcion del jugador es nil? entonces ->

    if options[jugador].nil?
        puts "Opcion inválida"
        next
    else
        puts "Elegiste:  #{options[jugador]}"
    end

    puts "↳ PC elige #{options[pc]}"
    
    # empezar por el empate y luego los que el jugador gane, quitando las opciones de perder
    # 1 piedra, 2 papel, 3 tijera

    puts resultado(jugador, pc)

end

puts "victorias: #{@wins} / perdidas: #{@losses} / empates: #{@draws}"
