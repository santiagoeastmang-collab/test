# loop do
#     puts "print until Ctrl + C"
# end

variable = gets.chomp.to_i

# loop do
#     variable = variable - 1
#     puts variable
#     if variable <= 0 # OR break if variable < 0
#         break
#     end
# end

while variable >= 0
    puts variable
    variable = variable - 1
end

puts "done"


# loop do
#     variable = variable + 1
#     puts variable
#     puts "esto se ve"
#     break
#     puts "esto no se ve"
# end