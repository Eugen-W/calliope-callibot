fahren = 0

def on_button_pressed_a():
    global fahren
    fahren = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global fahren
    fahren = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def überprüfSensor():
    if callibot.read_line_sensor(KSensor.LINKS, KSensorStatus.DUNKEL) and callibot.read_line_sensor(KSensor.RECHTS, KSensorStatus.DUNKEL):
        callibot.motor(KMotor.BEIDE, KDir.VORWÄRTS, 100)
        callibot.set_led(KMotor.BEIDE, KState.AN)
    elif callibot.read_line_sensor(KSensor.LINKS, KSensorStatus.HELL) and callibot.read_line_sensor(KSensor.RECHTS, KSensorStatus.DUNKEL):
        callibot.motor(KMotor.LINKS, KDir.VORWÄRTS, 100)
        callibot.motor_stop(KMotor.RECHTS, KStop.FREI)
        callibot.set_led(KMotor.LINKS, KState.AUS)
        callibot.set_led(KMotor.RECHTS, KState.AN)
    elif callibot.read_line_sensor(KSensor.LINKS, KSensorStatus.DUNKEL) and callibot.read_line_sensor(KSensor.RECHTS, KSensorStatus.HELL):
        callibot.motor(KMotor.RECHTS, KDir.VORWÄRTS, 0)
        callibot.motor_stop(KMotor.LINKS, KStop.FREI)
        callibot.set_led(KMotor.RECHTS, KState.AUS)
        callibot.set_led(KMotor.LINKS, KState.AN)
    else:
        callibot.motor_stop(KMotor.BEIDE, KStop.FREI)
        callibot.set_led(KMotor.BEIDE, KState.AUS)
def sucheLinie():
    for index in range(10):
        callibot.motor(KMotor.LINKS, KDir.VORWÄRTS, 50)
        basic.pause(100)
        callibot.motor(KMotor.RECHTS, KDir.VORWÄRTS, 50)
        basic.pause(100)

def on_forever():
    if fahren == 1:
        überprüfSensor()
    else:
        callibot.motor_stop(KMotor.BEIDE, KStop.FREI)
        callibot.set_led(KMotor.BEIDE, KState.AUS)
basic.forever(on_forever)
