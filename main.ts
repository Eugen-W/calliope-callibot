function drehen () {
    drehenTimer += -1
    callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
    callibot.motor(KMotor.links, KDir.vorwärts, 50)
    if (drehenTimer == 0) {
        status = "KreisSuchen"
        drehenTimer = 35
    }
}
function verlassen () {
    if (callibot.entfernung(KEinheit.cm) < 15) {
        callibot.motorStop(KMotor.beide, KStop.Bremsen)
    } else {
        if (drehenTimer90Grad > 0) {
            drehenTimer90Grad += -1
            callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
            callibot.motor(KMotor.links, KDir.vorwärts, 50)
        } else if (verlassenTimer > 0) {
            callibot.motor(KMotor.beide, KDir.vorwärts, 25)
            verlassenTimer += -1
        } else if (verlassenTimer <= 0) {
            callibot.motorStop(KMotor.beide, KStop.Bremsen)
            status = "WeißSuchen"
        }
    }
}
input.onButtonPressed(Button.A, function () {
    fahren = 1
    Zeit = 500
    kreisTimer = 75
    drehenTimer = 35
    drehenTimer90Grad = 20
    verlassenTimer = 50
    Richtung = "vorne"
})
function kreis_betreten () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        kreisTimer += -1
        callibot.motor(KMotor.rechts, KDir.vorwärts, 25)
        callibot.motorStop(KMotor.links, KStop.Bremsen)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.beide, KDir.rückwärts, 25)
        kreisTimer += -1
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.rückwärts, 25)
        kreisTimer += -1
    } else {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
    }
    if (kreisTimer == 0) {
        status = "KreisFahren"
    }
}
function weiß_suchen () {
    callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
    callibot.motor(KMotor.links, KDir.rückwärts, 50)
    drehenTimer += -1
    if (drehenTimer <= 0) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
        if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
            status = "KreisSuchen"
        }
    }
}
function kreis_suchen () {
    if (SucheBewegung == false) {
        sucheZeit = randint(10, 100)
        if (Richtung == "vorne") {
            Richtung = "hinten"
        } else {
            Richtung = "vorne"
        }
        SucheBewegung = true
    } else {
        sucheZeit += -1
        if (Richtung == "vorne") {
            callibot.motor(KMotor.beide, KDir.vorwärts, 25)
        } else {
            callibot.motor(KMotor.beide, KDir.rückwärts, 25)
        }
    }
    if (sucheZeit == 0) {
        SucheBewegung = false
    }
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        status = "KreisBetreten"
    }
}
input.onButtonPressed(Button.B, function () {
    fahren = 0
})
function kreis_fahren () {
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
        status = "KreisSuchen"
        kreisTimer += 75
    }
}
let sucheZeit = 0
let SucheBewegung = false
let Richtung = ""
let kreisTimer = 0
let fahren = 0
let verlassenTimer = 0
let drehenTimer90Grad = 0
let drehenTimer = 0
let Zeit = 0
let status = ""
status = "KreisSuchen"
let GegenstandImWeg = 0
Zeit = 500
basic.forever(function () {
    Zeit += -1
    if (Zeit > 0 && fahren == 1) {
        if (status == "KreisFahren") {
            kreis_fahren()
        } else if (status == "KreisSuchen") {
            kreis_suchen()
        } else if (status == "Drehen") {
            drehen()
        } else if (status == "WeißSuchen") {
            weiß_suchen()
        } else if (status == "KreisBetreten") {
            kreis_betreten()
        }
    }
    if (callibot.entfernung(KEinheit.cm) < 15) {
        status = "Drehen"
    }
    if (Zeit <= 0) {
        fahren = 0
        verlassen()
    }
})
