/*
************************************************************************
*                                                                      *
* (Use full screen.)                                                   *
*                                                                      *
*  ==================================================================  *
*  |                     _______  _______         ___               |  *
*  |   |\    /|    /\       |        |    |   |  |      \        /  |  *
*  |   | \  / |   /__\      |        |    |---|  |---    \  /\  /   |  *
*  |   |  \/  |  /    \     |        |    |   |  |___     \/  \/    |  *
*  |                                                                |  *
*  ==================================================================  *
*                                                                      *
*  All code written by Matthew Joseph James, 2020.                     *
*                                                                      *
*  For enquiries contact: mattdestroyerpro@gmail.com                   *
*                                                                      *
*  The following code runs a remake of the classic game snake.         *
*                                                                      *
************************************************************************
*/

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + ";";
}

function changeCookie(cname, cvalue, exdays) {
	setCookie(cname,"",-1);
	setCookie(cname, cvalue, exdays);
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let placeholder = getCookie("high");
	if (placeholder === "") {
		setCookie("high", 0, 100);
		return 0;
	}
	return parseInt(placeholder);
}

// Bind keys
function bindKeys() {
	document.onkeydown = function(e) {
		e = e || window.event;
		if (keyPause === 0) {
			started = true;
			switch (e.keyCode) {
				// WASD
				case 87:
					if (dir != 2) dir = 1;
					keyPause = 1;
					break;
				case 83:
					if (dir != 1) dir = 2;
					keyPause = 1;
					break;
				case 65:
					if (dir != 4) dir = 3;
					keyPause = 1;
					break;
				case 68:
					if (dir != 3) dir = 4;
					keyPause = 1;
					break;
					// ARROWS
				case 38:
					if (dir != 2) dir = 1;
					keyPause = 1;
					break;
				case 40:
					if (dir != 1) dir = 2;
					keyPause = 1;
					break;
				case 37:
					if (dir != 4) dir = 3;
					keyPause = 1;
					
					break;
				case 39:
					if (dir != 3) dir = 4;
					keyPause = 1;
					break;
					// RESTART
				case 82:
					reset();
					break;
				case 32:
					reset();
					break;
				// PAUSE
				case 80:
					(pause === true) ? pause = false : pause = true;
					break;
			}
			if (pause === true) pause = false;
		}
	}
}
// Draw Frame
function drawFrame() {
	canvCtx.beginPath();
	canvCtx.clearRect(0, 0, canv.width, canv.height);
	// Render snake
	canvCtx.fillStyle = "darkgreen";
	canvCtx.fillRect(x + 1, y + 1, 24, 24);
	for (let i = 0; i < score; i++) {
		canvCtx.fillStyle = "green";
		canvCtx.fillRect(tail[0][i] + 1, tail[1][i] + 1, 24, 24);
	}
	// Render apple
	canvCtx.fillStyle = "red";
	canvCtx.fillRect(ax + 1, ay + 1, 24, 24);
	canvCtx.closePath;
	canvCtx.fill;
	// Render score or "game over" screen
	canvCtx.fillStyle = "black";
	canvCtx.font = "20px Arial";
	if (exit === false) {
		canvCtx.fillText("High score: " + high, 5, 20);
		canvCtx.fillText("Score: " + score, 5, 45);
		if (started === false) {
			canvCtx.fillStyle = "black";
			canvCtx.font = "20px Arial";
			canvCtx.fillText("Use W, A, S, D or the arrow keys to steer.", canv.width / 7, canv.height - 275);
			canvCtx.fillText("Press any key to begin.", canv.width / 7, canv.height - 250);
		} else if (pause === true) {
			canvCtx.fillText("Paused", canv.width / 2 - 35, canv.height / 2 - 30);
		}
	} else {
		canvCtx.fillText("Game over!", 200, 100);
		canvCtx.fillText("Your final score was: " + score, 160, 150);
		canvCtx.fillText("Press the restart button above to restart.", 90, 200);
	}
}
// Check if a position is on the tail
function touchingTail(xPos, yPos) {
	for (let i = score; i > 0; i--) {
		if (xPos === tail[0][i]) {
			if (yPos === tail[1][i]) {
				return true;
			}
		}
	}
	return false;
}
// Set random apple position
function appleRandPos() {
	do {
		ax = Math.floor(Math.random() * (20) + 1) * 25;
		ay = Math.floor(Math.random() * (16) + 1) * 25;
	} while (touchingTail(ax, ay) === true)
}
// Update positioning variables and sense if off screen
function physics() {
	// Move tail
	if (score > 0) {
		for (let i = score; i > 0; i--) {
			tail[0][i] = tail[0][i - 1];
			tail[1][i] = tail[1][i - 1];
		}
		tail[0][0] = x;
		tail[1][0] = y;
	}
	// Head
	if (score === 0) {
		x2 = x;
		y2 = y;
	}
	if (dir === 1) {
		y -= 25;
	} else if (dir === 2) {
		y += 25;
	} else if (dir === 3) {
		x -= 25;
	} else if (dir === 4) {
		x += 25;
	}
	// Allow player to change direction again
	keyPause = 0;
	// Apple
	if (x === ax) {
		if (y === ay) {
			appleRandPos();
			score++;
			if (score > high) {
				high = score;
				setCookie("high", high, 100);
			}
			if (score === 1) {
				tail[0][0] = x2;
				tail[1][0] = y2;
			} else {
				tail[0].push(tail[0][tail[0].length - 1]);
				tail[1].push(tail[1][tail[1].length - 1]);
			}
		}
	}
	// Off screen
	if (x < 0) {
		exit = true;
	} else if (x > 500) {
		exit = true;
	}
	if (y < 0) {
		exit = true;
	} else if (y > 400) {
		exit = true;
	}
	// Check if head is touching tail
	if (touchingTail(x, y)) exit = true;
}

function tick() {
	if (pause === false && exit ===  false) {
		physics();
	}
	drawFrame();
}

function reset() {
	keyPause = 0;
	dir = 0;
	x = 100;
	y = 200;
	ax = 350;
	ay = 200;
	score = 0;
	exit = false;
	pause = false;
	tail = [
		[0],
		[0]
	];
	started = false;
}

//Initialise
let keyPause = 0;
let canv = document.getElementById("game");
let canvCtx = canv.getContext("2d");
let dir = 0;
let x = 100;
let y = 200;
let x2;
let y2;
let ax = 350;
let ay = 200;
let score = 0;
let exit = false;
let pause = false;
let tail = [
	[0],
	[0]
];
let started = false;
let high = checkCookie();
bindKeys();
//Game loop
let gameloop = setInterval(function() {
	tick();
}, 175);
