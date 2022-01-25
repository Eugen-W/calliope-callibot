let KreisGefunden: boolean = false
let SucheBewegung: boolean = false
let Fahren: boolean
let KreisTimer: number
let SucheZeit: number
let VerlassenTimer: number
let DrehenTimer90Grad: number
let DrehenTimer180Grad: number
let NeustartTimer: number
let Zeit: number = 500
let GegenstandImWeg = 0
let Status: string  = "KreisAusrichtung"
let Ausgang: string
let EingangRichtung: string = "rechts"

callibot.setRgbLed(KRgbLed.All, KRgbColor.rot, 8)

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
            if (Ausgang == "links") {
                callibot.motor(KMotor.links, KDir.vorwärts, 50)
                callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
            } else if (Ausgang == "rechts") {
                callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
                callibot.motor(KMotor.links, KDir.rückwärts, 50)
            }
            DrehenTimer90Grad -= 1
        } else if (VerlassenTimer > 0) {
            callibot.motor(KMotor.beide, KDir.vorwärts, 25)
            VerlassenTimer += -1
        } else if (VerlassenTimer <= 0) {
            zurückdrehen()
        }
    }
}

function zurückdrehen() {
    NeustartTimer -= 1
    if (NeustartTimer <= 0) {
        callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
        callibot.motor(KMotor.links, KDir.rückwärts, 50)
        DrehenTimer180Grad -= 1
        if (DrehenTimer180Grad <= 0) {
            Status = "KreisAusrichtung"
    }
}

function kreis_ausrichtung () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
    } else {
        Status = "KreisSuchen"
        // Status = "KreisAusrichtung"
    }
}
input.onButtonPressed(Button.A, function () {

    Fahren = true
    Zeit = 500
    KreisTimer = 50
    DrehenTimer180Grad = 35
    DrehenTimer90Grad = 20
    NeustartTimer = 50
    VerlassenTimer = 50
    KreisGefunden = false
})
function kreis_betreten () {
    callibot.setRgbLed(KRgbLed.All, KRgbColor.rot, 8)
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        KreisTimer += -1
        if (EingangRichtung == "rechts") {
            callibot.motor(KMotor.rechts, KDir.vorwärts, 25)
            callibot.motorStop(KMotor.links, KStop.Bremsen)
        }
        else if (EingangRichtung == "links") {
            callibot.motor(KMotor.links, KDir.vorwärts, 25)
            callibot.motorStop(KMotor.rechts, KStop.Bremsen)  
        }
        
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
            Status = "KreisAusrichtung"
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
        kreis_betreten()
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        KreisGefunden = true
    } else {
        if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
            EingangRichtung = "links"
        }
        else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
            EingangRichtung = "rechts"
        }
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
    }
}
input.onButtonPressed(Button.B, function () {
    Fahren = false
})


function kreis_fahren () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 50)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.links, KDir.vorwärts, 50)
        callibot.motorStop(KMotor.rechts, KStop.Frei)
        Ausgang = "links"
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
        callibot.motorStop(KMotor.links, KStop.Frei)
        Ausgang = "rechts"
    }
}
basic.forever(function () {

    Zeit += -1
    if (Zeit > 0 && Fahren == true) {
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
        } else if (Status == "KreisAusrichtung") {
            kreis_ausrichtung()
        }
    }
    if (callibot.entfernung(KEinheit.cm) < 15) {
        Status = "Drehen"
    }
    if (Zeit <= 0) {
        Fahren = false
        verlassen()
    }
})
}