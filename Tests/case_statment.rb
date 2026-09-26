

# def upp(string)
#     if string.length > 10
#         string.upcase
#     else
#         string
#     end
# end

# puts upp('santiago eastman gonzalez')
# puts upp('santiago')

puts "enter a number"
number = gets.chomp.to_i

if number < 0
    puts "you can't have a negative number"
elsif number <= 50
    puts "#{number} is between 0 and 50"
elsif number <= 100
    puts "#{number} is between 51 and 100"
else
    puts "#{number} is greater than 100"
end
