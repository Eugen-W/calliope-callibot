function drehen () {
    DrehenTimer180Grad += -1
    callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
    callibot.motor(KMotor.links, KDir.vorwärts, 50)
    if (DrehenTimer180Grad == 0) {
        Status = "KreisSuchen"
        DrehenTimer180Grad = 35
    }
}
function verlassen () {
    if (callibot.entfernung(KEinheit.cm) < 15) {
        callibot.motorStop(KMotor.beide, KStop.Bremsen)
    } else {
        if (DrehenTimer90Grad > 0) {
            DrehenTimer90Grad += -1
            callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
            callibot.motor(KMotor.links, KDir.vorwärts, 50)
        } else if (VerlassenTimer > 0) {
            callibot.motor(KMotor.beide, KDir.vorwärts, 25)
            VerlassenTimer += -1
        } else if (VerlassenTimer <= 0) {
            callibot.motorStop(KMotor.beide, KStop.Bremsen)
            Status = "WeißSuchen"
        }
    }
}
function vor_zurück_fahren () {
    if (SucheBewegung == false) {
        SucheZeit = randint(10, 100)
        if (Richtung == "vorne") {
            Richtung = "hinten"
        } else {
            Richtung = "vorne"
        }
        SucheBewegung = true
    } else {
        SucheZeit += -1
        if (Richtung == "vorne") {
            callibot.motor(KMotor.beide, KDir.vorwärts, 25)
        } else {
            callibot.motor(KMotor.beide, KDir.rückwärts, 25)
        }
    }
    if (SucheZeit == 0) {
        SucheBewegung = false
    }
}
input.onButtonPressed(Button.A, function () {
    Fahren = 1
    Zeit = 500
    KreisTimer = 75
    DrehenTimer180Grad = 35
    DrehenTimer90Grad = 20
    VerlassenTimer = 50
    Richtung = "hinten"
    KreisGefunden = false
})
function kreis_betreten () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        KreisTimer += -1
        callibot.motor(KMotor.rechts, KDir.vorwärts, 25)
        callibot.motorStop(KMotor.links, KStop.Bremsen)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.beide, KDir.rückwärts, 25)
        KreisTimer += -1
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.rückwärts, 25)
        KreisTimer += -1
    }
    if (KreisTimer == 0) {
        Status = "KreisFahren"
    }
}
function weiß_suchen () {
    callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
    callibot.motor(KMotor.links, KDir.rückwärts, 50)
    DrehenTimer180Grad += -1
    if (DrehenTimer180Grad <= 0) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
        if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
            Status = "KreisSuchen"
        }
    }
}
function test () {
    if (Status == "KreisFahren") {
        callibot.setLed(KMotor.beide, KState.an)
    } else {
        callibot.setLed(KMotor.beide, KState.aus)
    }
}
function kreis_suchen () {
    if (KreisGefunden == true) {
        callibot.setRgbLed(KRgbLed.All, KRgbColor.rot, 8)
        kreis_betreten()
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        KreisGefunden = true
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell) || callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        vor_zurück_fahren()
    }
}
input.onButtonPressed(Button.B, function () {
    Fahren = 0
})
function kreis_fahren () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 50)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.links, KDir.vorwärts, 50)
        callibot.motorStop(KMotor.rechts, KStop.Bremsen)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
        callibot.motorStop(KMotor.links, KStop.Bremsen)
    }
}
let KreisGefunden = false
let KreisTimer = 0
let Fahren = 0
let Richtung = ""
let SucheZeit = 0
let SucheBewegung = false
let VerlassenTimer = 0
let DrehenTimer90Grad = 0
let DrehenTimer180Grad = 0
let Zeit = 0
let Status = ""
Status = "KreisSuchen"
let GegenstandImWeg = 0
Zeit = 500
basic.forever(function () {
    Zeit += -1
    if (Zeit > 0 && Fahren == 1) {
        if (Status == "KreisFahren") {
            kreis_fahren()
        } else if (Status == "KreisSuchen") {
            kreis_suchen()
        } else if (Status == "Drehen") {
            drehen()
        } else if (Status == "WeißSuchen") {
            weiß_suchen()
        } else if (Status == "KreisBetreten") {
            kreis_betreten()
        }
    }
    if (callibot.entfernung(KEinheit.cm) < 15) {
        Status = "Drehen"
    }
    if (Zeit <= 0) {
        Fahren = 0
        verlassen()
    }
    test()
})
