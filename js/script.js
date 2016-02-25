"use strict";

function Timer(className) {
	var fullTime = 25 * 60 * 1000;
	var currentTime = fullTime;
	var timerClass = document.getElementsByClassName(className)[0];
	var buttonStartPause = document.getElementsByClassName("button")[0];
	var minutes;
	var seconds;
	var timer;
	var self = this;

	this.start = function() {
		if(!minutes && !seconds) self.setFullTime(fullTime);
		timer = setInterval(update, 1000);
		buttonStartPause.innerHTML = "Pause";
		buttonStartPause.onclick = self.stop;
	}

	buttonStartPause.onclick = this.start;

	this.stop = function() {
		clearInterval(timer);
		buttonStartPause.innerHTML = "Start";
		buttonStartPause.onclick = self.start;
	}

	this.getButtonStartPause = function() {
		return buttonStartPause;
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
