function drehen () {
    drehenTimer += -1
    callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
    callibot.motor(KMotor.links, KDir.vorwärts, 50)
    if (drehenTimer == 0) {
        status = 0
        drehenTimer = 35
    }
}
function sucheKreis () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        kreisTimer += -1
        callibot.motor(KMotor.rechts, KDir.vorwärts, 25)
        callibot.motorStop(KMotor.links, KStop.Bremsen)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.beide, KDir.rückwärts, 25)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        kreisTimer += -1
        callibot.motor(KMotor.links, KDir.vorwärts, 25)
        callibot.motorStop(KMotor.rechts, KStop.Bremsen)
    } else {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
    }
    if (kreisTimer == 0) {
        status = 1
    }
}
input.onButtonPressed(Button.A, function () {
    fahren = 1
    Zeit = 1000
    status = 0
    kreisTimer = 75
    drehenTimer = 35
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
}
input.onButtonPressed(Button.B, function () {
    fahren = 0
})
let Zeit = 0
let fahren = 0
let kreisTimer = 0
let status = 0
let drehenTimer = 0
let GegenstandImWeg = 0
basic.forever(function () {
    Zeit += -1
    if (Zeit > 0 && fahren == 1) {
        if (status == 1) {
            fahrenimkreis()
        } else if (status == 0) {
            sucheKreis()
        } else if (status == 2) {
            drehen()
        }
    } else {
        callibot.motorStop(KMotor.beide, KStop.Frei)
        callibot.setLed(KMotor.beide, KState.aus)
    }
    if (callibot.entfernung(KEinheit.cm) < 15) {
        status = 2
    }
})
