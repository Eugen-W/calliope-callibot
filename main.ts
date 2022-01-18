let fahren = 0
input.onButtonPressed(Button.A, function () {
    fahren = 1
})
input.onButtonPressed(Button.B, function () {
    fahren = 0
})
function überprüfSensor () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.vorw&#228;rts, 100)
        callibot.setLed(KMotor.beide, KState.an)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.links, KDir.vorw&#228;rts, 100)
        callibot.motorStop(KMotor.rechts, KStop.Frei)
        callibot.setLed(KMotor.links, KState.aus)
        callibot.setLed(KMotor.rechts, KState.an)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.rechts, KDir.vorw&#228;rts, 100)
        callibot.motorStop(KMotor.links, KStop.Frei)
        callibot.setLed(KMotor.rechts, KState.aus)
        callibot.setLed(KMotor.links, KState.an)
    } else {
        callibot.motorStop(KMotor.beide, KStop.Frei)
        callibot.setLed(KMotor.beide, KState.aus)
    }
}
basic.forever(function () {
    if (fahren == 1) {
        überprüfSensor()
    } else {
        callibot.motorStop(KMotor.beide, KStop.Frei)
        callibot.setLed(KMotor.beide, KState.aus)
    }
})
