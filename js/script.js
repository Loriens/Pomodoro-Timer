"use strict";

function Timer() {
  var fullTime = 25 * 60 * 1000;
  var currentTime = fullTime;
  var realFullTime; // for breaks
  var breakFullTime = 5 * 60 * 1000;
  var currentBreakFullTime = breakFullTime;
  var timerClass;
  var buttonStartPause;
  var buttonSettings;
  var audio;
  var panelSettings;
  var buttonsFullTime;
  var buttonsBreakFullTime;
  var minutes;
  var seconds;
  var timer;
  var self = this;

  this.setTimerClass = function(className) {
    timerClass = document.getElementsByClassName(className)[0];
  }

  this.setButtonStartPause = function(nameButton) {
    buttonStartPause = document.getElementsByName(nameButton)[0];
    buttonStartPause.onclick = start;
  }

  this.setButtonSettings = function(nameButton) {
    buttonSettings = document.getElementsByName(nameButton)[0];
    buttonSettings.onclick = showSettings;
  }

  this.setPanelSettings = function(className) {
    panelSettings = document.getElementsByClassName(className)[0];
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

  this.setDefaultFullTime = function() {
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
    breakFullTime = currentBreakFullTime = newBreakFullTime;
  }

  this.setAudio = function(className) {
    audio = document.getElementsByClassName(className)[0];
  }

  var start = function() {
    if(!minutes && !seconds) self.setFullTime(fullTime);
    timer = setInterval(update, 1000);
    buttonStartPause.innerHTML = "Pause";
    buttonStartPause.onclick = stop;
    buttonSettings.disabled = true;
  }

  var showSettings = function() {
    buttonStartPause.disabled = true;
    stop();
    panelSettings.style.display = "block";
    buttonSettings.onclick = hideSettings;
  }

  var hideSettings = function() {
    panelSettings.style.display = "none";
    buttonStartPause.disabled = false;
    buttonSettings.onclick = showSettings;
    buttonStartPause.onclick = start;
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

  var stop = function() {
    clearInterval(timer);
    buttonStartPause.innerHTML = "Start";
    buttonStartPause.onclick = start;
    buttonSettings.disabled = false;
  }


  var update = function() {
    setTimeHtml();
    if(!minutes && !seconds) {
      stop();
      if(fullTime != breakFullTime) {
        realFullTime = fullTime;
        self.setFullTime(breakFullTime);
        start();
        buttonStartPause.innerHTML = "Relax...";
        buttonStartPause.disabled = true;
      } else {
        currentBreakFullTime = breakFullTime;
        self.setFullTime(realFullTime);
        buttonStartPause.disabled = false;
      }
      sound();
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

  var sound = function() {
    audio.play();
  }
}
