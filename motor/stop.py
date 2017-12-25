import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(25,GPIO.OUT) #enable left
GPIO.setup(24,GPIO.OUT) #forward left
GPIO.setup(23,GPIO.OUT) #backward left

GPIO.setup(17,GPIO.OUT) #forward right
GPIO.setup(27,GPIO.OUT) #backward right
GPIO.setup(22,GPIO.OUT) #enable right

def zero():
    GPIO.output(25,GPIO.LOW)
    GPIO.output(24,GPIO.LOW)
    GPIO.output(23,GPIO.LOW)
    GPIO.output(17,GPIO.LOW)
    GPIO.output(27,GPIO.LOW)
    GPIO.output(22,GPIO.LOW)

zero()

time.sleep(1)

GPIO.cleanup()
