"use strict";

function Timer(className) {
	var fullTime = 25 * 60 * 1000;
	var currentTime = fullTime;
	var timerClass = document.getElementsByClassName(className)[0];
	var buttonStart = document.getElementsByClassName("button")[0];
	var minutes;
	var seconds;
	var timer;
	var self = this;

	this.start = function() {
		this.timerDefault();
		timer = setInterval(self.update, 1000);
		buttonStart.innerHTML = "Pause";
	}

	this.timerDefault = function() {
		minutes = (fullTime >= 60 * 1000) ? (fullTime / (60 * 1000)) : 0;
		seconds = fullTime / 1000 - minutes * 60;
		setTime();
		minusSecond();
	}

	this.update = function() {
		setTime();
		if(!minutes && !seconds) self.stop();
		minusSecond();
	}

	this.stop = function() {
		clearInterval(timer);
		buttonStart.innerHTML = "Start";
	}

	this.setFullTime = function(newFullTime) {
		if(newFullTime > 0 && newFullTime < 60 * 60 * 1000) fullTime = newFullTime;
	}

	var setTime = function() {
		timerClass.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	}

	var minusSecond = function() {
		if(seconds > 0) seconds--;
		else {
			seconds = 59;
			minutes--;
		}
	}
}
