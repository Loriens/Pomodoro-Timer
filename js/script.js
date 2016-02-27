"use strict";

function Timer() {
  var fullTime = 25 * 60 * 1000;
  var currentTime = fullTime;
  var timerClass;
  var buttonStartPause;
  var buttonsFullTime;
  var buttonsBreakFullTime;
  var minutes;
  var seconds;
  var breakFullTime = 5 * 60 * 1000;
  var timer;
  var self = this;

  this.startPause = function() {
    if(!minutes && !seconds) self.setFullTime(fullTime);
    timer = setInterval(update, 1000);
    buttonStartPause.innerHTML = "Pause";
    buttonStartPause.onclick = self.stop;
  }

  this.stop = function() {
    clearInterval(timer);
    buttonStartPause.innerHTML = "Start";
  }

  this.setTimerClass = function(className) {
    timerClass = document.getElementsByClassName(className)[0];
  }

  this.setButtonStartPause = function(nameButton) {
    buttonStartPause = document.getElementsByClassName(nameButton)[0];
    buttonStartPause.onclick = self.startPause;
  }

  this.setButtonsFullTime = function(nameButtons) {
    buttonsFullTime = document.getElementsByName(nameButtons);
    for(var i = 0; i < buttonsFullTime.length; i++) {
      if(buttonsFullTime[i].value != getFullMinutes()) {
        buttonsFullTime[i].checked = false;
      } else {
        buttonsFullTime[i].checked = true;
      }

      buttonsFullTime[i].onclick = changeFullTime;
    }
  }

  this.setButtonsBreakFullTime = function(nameButtons) {
    buttonsBreakFullTime = document.getElementsByName(nameButtons);
    for(var i = 0; i < buttonsBreakFullTime.length; i++) {
      if((buttonsBreakFullTime[i].value * 60 * 1000) != breakFullTime) {
        buttonsBreakFullTime[i].checked = false;
      } else {
        buttonsBreakFullTime[i].checked = true;
      }

      buttonsBreakFullTime[i].onclick = changeBreakFullTime;
    }
  }

  this.defaultFullTime = function() {
    minutes = 25;
    seconds = 0;
    setTimeHtml();
    minusSecond();
  }

  this.setFullTime = function(newFullTime) {
    if(newFullTime > 0 && newFullTime < 60 * 60 * 1000) fullTime = newFullTime;
    seconds = getFullSeconds();
    minutes = getFullMinutes();
    setTimeHtml();
    minusSecond();
  }

  this.setBreakFullTime = function(newBreakFullTime) {
    breakFullTime = newBreakFullTime;
  }

  var changeFullTime = function() {
    for(var i = 0; i < buttonsFullTime.length; i++) {
      if(buttonsFullTime[i].checked) {
        self.setFullTime(buttonsFullTime[i].value * 60 * 1000);
        return;
      }
    }
  }

  var changeBreakFullTime = function() {
    for(var i = 0; i < buttonsBreakFullTime.length; i++) {
      if(buttonsBreakFullTime[i].checked) {
        self.setBreakFullTime(buttonsBreakFullTime[i].value * 60 * 1000);
        return;
      }
    }
  }

  var update = function() {
    setTimeHtml();
    if(!minutes && !seconds) {
      self.stop();
      return;
    }
    minusSecond();
  }

  var setTimeHtml = function() {
    timerClass.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }

  var minusSecond = function() {
    if(seconds > 0) seconds--;
    else {
      seconds = 59;
      minutes--;
    }
  }

  var getFullSeconds = function() {
    return (fullTime % (1000 * 60)) / 1000;
  }

  var getFullMinutes = function() {
    return (fullTime - getFullSeconds() * 1000) / (1000 * 60);
  }
}
