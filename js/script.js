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
		if(buttonStart.innerHTML == "Pause") {
			self.stop();
			return;
		}
		if(!minutes && !seconds) self.setFullTime(fullTime);
		timer = setInterval(update, 1000);
		buttonStart.innerHTML = "Pause";
	}

	this.stop = function() {
		clearInterval(timer);
		buttonStart.innerHTML = "Start";
	}

	this.getTimer = function() {
		return timerClass;
	}

	this.defaultFullTime = function() {
		minutes = 25;
		seconds = 0;
		setTimeHtml();
		minusSecond();
	}

	this.setFullTime = function(newFullTime) {
		if(newFullTime > 0 && newFullTime < 60 * 60 * 1000) fullTime = newFullTime;
		seconds = (fullTime % (1000 * 60)) / 1000;
		minutes = (fullTime - seconds * 1000) / (1000 * 60);
		setTimeHtml();
		minusSecond();
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
}
