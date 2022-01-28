const TANZ_TIMER_LÄNGE = 55
let KreisGefunden: boolean = false
let SucheBewegung: boolean = false
let Fahren: boolean
let KreisTimer: number
let SucheZeit: number
let VerlassenTimer: number
let DrehenTimer90Grad: number = 15
let DrehenTimer180Grad: number =  30
let NeustartTimer: number
let Zeit: number
let KreisGeschwindigkeit: number
let BeschleunigungsTimer: number
let TaktTimer: number = TANZ_TIMER_LÄNGE
let Schritt = 1
let GegenstandImWeg = 0
let Status: string
let Ausgang: string
let EingangRichtung: string = "rechts"

input.onButtonPressed(Button.A, function () {
    neustart()
})
input.onButtonPressed(Button.B, function () {
    callibot.motorStop(KMotor.beide, KStop.Bremsen)
    Fahren = false
})
input.onButtonPressed(Button.AB, function () {
    Status = "Tanzen"
    DrehenTimer180Grad = 50
})
function tanzen() {
    const MAXIMALE_SCHRITTE = 7
    if (TaktTimer > 0) {
        TaktTimer -= 1
        if (TaktTimer >= TANZ_TIMER_LÄNGE / 2 && DrehenTimer180Grad > 0) {
            if (Schritt < 3 || Schritt > 3 && Schritt < 6 ) {
                callibot.motor(KMotor.beide, KDir.vorwärts, 25)
            }
            else if (Schritt == 3 ) {
                callibot.motor(KMotor.links, KDir.vorwärts, 100)
                callibot.motor(KMotor.rechts, KDir.rückwärts, 100)
                DrehenTimer180Grad -= 1
            }
            else if (Schritt == 6 || Schritt == 7 ) {
                callibot.motor(KMotor.links, KDir.vorwärts, 100)
                callibot.motorStop(KMotor.rechts, KStop.Frei)
              
            }
        }
        else {
            callibot.motorStop(KMotor.beide, KStop.Bremsen)
        }
    }
    else {
        Schritt += 1
        DrehenTimer180Grad = 30
        TaktTimer = TANZ_TIMER_LÄNGE
    }
    if (Schritt > MAXIMALE_SCHRITTE) {
        Schritt = 1
    }
}
function neustart() {
    Fahren = true
    Zeit = 500
    KreisGeschwindigkeit = 25
    BeschleunigungsTimer = 10
    KreisTimer = 30
    DrehenTimer180Grad = 30
    DrehenTimer90Grad = 15
    NeustartTimer = 50
    VerlassenTimer = 35
    KreisGefunden = false
    Status = "KreisAusrichtung"
}
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
            DrehenTimer90Grad -= 1
            
            if (Ausgang == "links") {
                callibot.motor(KMotor.links, KDir.vorwärts, 50)
                callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
            } else if (Ausgang == "rechts") {
                callibot.motor(KMotor.rechts, KDir.vorwärts, 50)
                callibot.motor(KMotor.links, KDir.rückwärts, 50)
            }
        } else if (VerlassenTimer > 0) {
            callibot.motor(KMotor.beide, KDir.vorwärts, 25)
            VerlassenTimer -= 1
        } else if (VerlassenTimer <= 0) {
            zurückdrehen()
        }
    }
}
function zurückdrehen() {
    if (NeustartTimer >= 0) {
        callibot.motorStop(KMotor.beide, KStop.Bremsen)
        NeustartTimer -= 1
    } else {
        DrehenTimer180Grad -= 1
        callibot.motor(KMotor.links, KDir.vorwärts, 50)
        callibot.motor(KMotor.rechts, KDir.rückwärts, 50)
    }
    if (DrehenTimer180Grad <= 0) {  
        neustart()
    }
}
function kreis_ausrichtung () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.beide, KDir.vorwärts, 25)
    } else {
        Status = "KreisSuchen"
    }
}
function kreis_betreten () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        KreisTimer -= 1
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
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.rückwärts, 25)
    }
    if (KreisTimer == 0) {
        Status = "KreisFahren"
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



function kreis_fahren (BeschleunigungsMultiplikator: number) {
    Zeit -= 1
    beschleunigung(BeschleunigungsMultiplikator)
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.beide, KDir.vorwärts, KreisGeschwindigkeit)
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.hell) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.motor(KMotor.links, KDir.vorwärts, KreisGeschwindigkeit)
        callibot.motorStop(KMotor.rechts, KStop.Frei)
        Ausgang = "links"
    } else if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel) && callibot.readLineSensor(KSensor.rechts, KSensorStatus.hell)) {
        callibot.motor(KMotor.rechts, KDir.vorwärts, KreisGeschwindigkeit)
        callibot.motorStop(KMotor.links, KStop.Frei)
        Ausgang = "rechts"
    }
}

function beschleunigung(BeschleunigungsMultiplikator: number) {
    if (BeschleunigungsMultiplikator > 0) {
        if (KreisGeschwindigkeit < 100) {
            BeschleunigungsTimer -= 1   
        }
    }
    else {
        if (KreisGeschwindigkeit > 0) {
            BeschleunigungsTimer -= 1
        }
    }
    if (BeschleunigungsTimer <= 0) {
            KreisGeschwindigkeit += 2 * BeschleunigungsMultiplikator
            BeschleunigungsTimer = 10
    }
}
basic.forever(function () {
    if (Status == "Tanzen") {
        tanzen()
    }
    else {

        if (Zeit > 0 && Fahren == true) {
            if (Status == "KreisFahren") {
                kreis_fahren(1)
            } else if (Status == "KreisSuchen") {
                kreis_suchen()
            } else if (Status == "Drehen") {
                drehen()
            } else if (Status == "KreisBetreten") {
                kreis_betreten()
            } else if (Status == "KreisAusrichtung") {
                kreis_ausrichtung()
            }
        }
        if (Zeit <= 0) {
            if (KreisGeschwindigkeit > 0) {
                kreis_fahren(-1)
            }
            else {
                Fahren = false
                verlassen()
            }  
        }
        if (callibot.entfernung(KEinheit.cm) < 15) {
            Status = "Drehen"
        }
    }
})
