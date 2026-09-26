class Greater
    attr_accessor :names

    #object
    def initialize(names = "world") # default
        @names = names
    end

    # saying hi
    def say_hi
        if @names.nil? #access to method
            puts "…"
        elsif @names.respond_to?("each") # es un array ?
            @names.each do |name| # name es variable local 
                puts "Hello, #{name}!"
            end
        else
            puts "Hello, #{@names}!"
        end
    end

    # saying bye
    def say_bye
        if @names.nil?
            puts "…"
        elsif @names.respond_to?("join")
            puts "Goodbye #{@names.join(", ")} see you"
        else
            puts "Goodbye #{@names} see you"
        end
    end
end

if __FILE__ == $0 # "Haz esto s i estoy ejecutando este archivo directamente, pero no si otro archivo lo importa."
  mg = Greater.new #mg es la variable
  mg.say_hi
  mg.say_bye

  # Change name to be "Zeke"
  mg.names = "Zeke"
  mg.say_hi
  mg.say_bye

  # Change the name to an array of names
  mg.names = ["Albert", "Brenda", "Charles",
              "Dave", "Engelbert"]
  mg.say_hi
  mg.say_bye

  # Change to nil
  mg.names = nil
  mg.say_hi
  mg.say_bye
end


# # puts "what's your name?"
# # name = gets.chomp
# # puts name

# def say(words)
#     puts words
# end

# # say("hello")
# # say("what's up")


# a = [1, 2, 3, 4, 5] 

# def mutate(array)
#     array.pop
# end

# puts "before: #{a}" 
# mutate(a)
# puts "after: #{a}"

# #######
# #
# # methods are to be executed multiple times without writing it over and over again
# # def hi(name = "World") if no name then "world" -> default parameter
# # 
# # 
# # 
# # 
# # 
# # 
