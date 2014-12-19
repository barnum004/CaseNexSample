$(document).ready(function () {
    overall = new Lap(0, new Date().getTime());
    current = new Lap(1, new Date().getTime());
    interval = null;

    $('#btnLap').prop('disabled', 'disabled');

    $('#btnLap').on('click', function () {
        startLap();
    });

    $('#btnStartStop').one('click', function () {
        start();
    });
});

function start() {
    overall = new Lap(0, new Date().getTime());
    current = new Lap(1, new Date().getTime());

    $('#lapTimes').html('');

    $('#btnLap').prop('disabled', '');

    $('#btnStartStop').prop('value',"Stop");

    $('#btnStartStop').one('click', function () {
        stop();
    });

    interval = setInterval(function () {
        updateScreen();
    }, 300);

    updateScreen();
}

function startLap() {
    $('#lapTimes').append("<li> Lap " + current.lapNumber + "&nbsp;&nbsp; " + current.toMMSSMilli(current.elapsedTime) + " </li>");
    var newLapNo = current.lapNumber + 1;
    current = new Lap(newLapNo, new Date().getTime());
}

function stop() {
    $('#btnStartStop').prop('value', "Start");

    $('#btnStartStop').one('click', function () {
        start();
    });

    clearInterval(interval);
    updateScreen();
}

function updateScreen() {
    current.updateElapsed();
    overall.updateElapsed();
    $('#lapTime').html(current.toMMSSMilli(current.elapsedTime));
    $('#overallTime').html(overall.toMMSSMilli(overall.elapsedTime));
}

function Lap(lapNumber, startTime) {

    //properties
    this.lapNumber = lapNumber;
    this.startTime = startTime;
    this.stopTime = null;
    this.elapsedTime = 0;
}

Lap.prototype.updateElapsed = function () {
    this.stopTime = new Date().getTime();

    this.elapsedTime = this.elapsedTime + (this.stopTime - this.startTime);

    this.startTime = new Date().getTime();
}

Lap.prototype.toMMSSMilli = function(numberToFormat){
    var min = Math.floor(numberToFormat / 60000);
    var sec = Math.floor(numberToFormat / 1000) % 60;
    var ms = numberToFormat % 1000;

    return zeroPad(min.toString(), 2) + ":" + zeroPad(sec.toString(), 2) + "." + zeroPad(ms.toString(), 3);
}


function zeroPad(str, len) {
    return str.length < len ? zeroPad("0" + str, len) : str;
}