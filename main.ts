basic.forever(function () {
    if (callibot.readLineSensor(KSensor.links, KSensorStatus.dunkel)) {
        callibot.setLed(KMotor.links, KState.an)
        callibot.motorStop(KMotor.rechts, KStop.Frei)
    } else {
        callibot.setLed(KMotor.links, KState.aus)
        callibot.motorStop(KMotor.rechts, KStop.Frei)
    }
})
basic.forever(function () {
    if (callibot.readLineSensor(KSensor.rechts, KSensorStatus.dunkel)) {
        callibot.setLed(KMotor.rechts, KState.an)
        callibot.motor(KMotor.links, KDir.vorwärts, 0)
    } else {
        callibot.setLed(KMotor.rechts, KState.aus)
        callibot.motorStop(KMotor.links, KStop.Frei)
    }
})
