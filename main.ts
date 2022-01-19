function sucheKreis () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        kreisTimer += -1
        callibot.motor(KMotor.rechts, KDir.vorwärts, 25)
        callibot.motorStop(KMotor.links, KStop.Bremsen)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.beide, KDir.rückwärts, 25)
    } else {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
    }
    if (kreisTimer == 0) {
        kreisgefunden = 1
    }
}
input.onButtonPressed(Button.A, function () {
    fahren = 1
    Zeit = 500
    kreisgefunden = 0
    kreisTimer = 75
})
function fahrenimkreis () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 50)
        callibot.setLed(KMotor.beide, KState.an)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.links, KDir.vorwärts, 50)
        callibot.motorStop(KMotor.rechts, KStop.Frei)
        callibot.setLed(KMotor.links, KState.aus)
        callibot.setLed(KMotor.rechts, KState.an)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
        callibot.motorStop(KMotor.links, KStop.Frei)
        callibot.setLed(KMotor.rechts, KState.aus)
        callibot.setLed(KMotor.links, KState.an)
    } else {
        callibot.motorStop(KMotor.beide, KStop.Frei)
        callibot.setLed(KMotor.beide, KState.aus)
    }
    if (callibot.entfernung(KEinheit.cm) < 20) {
        fahren = 0
        GegenstandImWeg = 1
    }
}
input.onButtonPressed(Button.B, function () {
    fahren = 0
})
let Zeit = 0
let fahren = 0
let kreisgefunden = 0
let kreisTimer = 0
let GegenstandImWeg = 0
GegenstandImWeg = 0
basic.forever(function () {
    Zeit += -1
    if (Zeit > 0 && fahren == 1) {
        if (kreisgefunden == 1) {
            fahrenimkreis()
        } else if (kreisgefunden == 0) {
            sucheKreis()
        }
    } else {
        callibot.motorStop(KMotor.beide, KStop.Frei)
        callibot.setLed(KMotor.beide, KState.aus)
    }
    if (GegenstandImWeg == 1 && callibot.entfernung(KEinheit.cm) > 20) {
        fahren = 1
    }
})
