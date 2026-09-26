module Speak
    def Speak(sound)
        puts sound
    end
end

class GoodDog
    include Speak
end

sparky = GoodDog.new
sparky.Speak("Arf!")



#sparky = variable @name, @age, etc…
#new = method

# puts vs return
# puts => telling the method to print something

# Constant variables UPPERCASED
# Global variables $variable
# Class variables @@variable => related to a class
# Instance variables @variabl
# local variable => var