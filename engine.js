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

// Bind keys
function bindKeys() {
	document.onkeydown = function(e) {
		e = e || window.event;
		if (keyPause === 0) {
			started = true;
			switch (e.keyCode) {
					// WASD
				case 87:
					if (dir != 2) {
						dir = 1;
					}
					keyPause = 1;
					break;
				case 83:
					if (dir != 1) {
						dir = 2;
					}
					keyPause = 1;
					break;
				case 65:
					if (dir != 4) {
						dir = 3;
					}
					keyPause = 1;
					break;
				case 68:
					if (dir != 3) {
						dir = 4;
					}
					keyPause = 1;
					break;

					// ARROWS
				case 38:
					if (dir != 2) {
						dir = 1;
					}
					keyPause = 1;
					break;
				case 40:
					if (dir != 1) {
						dir = 2;
					}
					keyPause = 1;
					break;
				case 37:
					if (dir != 4) {
						dir = 3;
					}
					keyPause = 1;
					break;
				case 39:
					if (dir != 3) {
						dir = 4;
					}
					keyPause = 1;
					break;

					// RESTART
				case 32:
					dir = 0;
					x = 100;
					y = 200;
					ax = 350;
					ay = 200;
					score = 0;
					exit = false;
					tail = [[0], [0]];
					keyPause = 0;
					break;
			}
		}
	}
}

// Draw Frame
function drawFrame() {
	canvCtx.beginPath();
	canvCtx.clearRect(0,0, canv.width, canv.height);
	
	// Render snake
	canvCtx.fillStyle = "darkgreen";
	canvCtx.fillRect(x + 1, y + 1, 24, 24);
	for (let i = 0; i < score; i++) {
		canvCtx.fillStyle = "green";
		canvCtx.fillRect(tail[0][i] + 1, tail[1][i] + 1, 24, 24);
	}
	
	// Render apple
	canvCtx.fillStyle = "red";
	canvCtx.fillRect(ax, ay, 25, 25);
	canvCtx.closePath;
	canvCtx.fill;
	
	// Render score or "game over" screen
	if (exit === false) {
		canvCtx.fillStyle = "black";
		canvCtx.font = "20px Arial";
		canvCtx.fillText("Score: " + score, 10, 25);
		if (started === false) {
			canvCtx.fillStyle = "black";
			canvCtx.font = "20px Arial";
			canvCtx.fillText("Use W, A, S, D or the arrow keys to steer.", canv.width / 7, canv.height - 275);
			canvCtx.fillText("Press any key to begin.", canv.width / 7, canv.height - 250);
		}
	} else {
		canvCtx.fillStyle = "black";
		canvCtx.font = "20px Arial";
		canvCtx.fillText("Game over!", canv.width / 7, canv.height - 300);
		canvCtx.fillText("Your final score was: " + score, canv.width / 7, canv.height - 250);
		canvCtx.fillText("Press space to play again.", canv.width / 7, canv.height - 200);
	}
}

// Update positioning variables and sense if off screen
function positioning() {
	if (exit === false) {
		// Tail
		tail[0][0] = x;
		tail[1][0] = y;
		if (score > 0) {
			for (let i = score; i > 0; i--) {
				tail[0][i] = tail[0][i - 1];
				tail[1][i] = tail[1][i - 1];
			}
		}
		
		// Head
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
				ax = Math.floor(Math.random() * (20) + 1) * 25;
				ay = Math.floor(Math.random() * (16) + 1) * 25;
				score++;
				tail[0].push(tail[0][tail[0].length - 1]);
				tail[1].push(tail[1][tail[1].length - 1]);
			}
		}
		// Off screen
		if (x < 0) {
			exit = true;
		} else if (x > 500) {
			exit = true;
		} else if (y < 0) {
			exit = true;
		} else if (y > 400) {
			exit = true;
		}
		
		// Touching tail
		for (let i = score; i > 0; i--) {
			if (i > 3) {
				if (x === tail[0][i]) {
					if (y === tail[1][i]) {
						exit = true;
					}
				}
			}
		}
	}
}

function tick() {
	if (pause === false) {
		positioning();
	}
	drawFrame();
}

//Initialise
let keyPause = 0;
bindKeys();
let canv = document.getElementById("game");
let canvCtx = canv.getContext("2d");
let dir = 0;
let x = 100;
let y = 200;
let ax = 350;
let ay = 200;
let score = 0;
let exit = false;
let pause = false;
let tail = [[0], [0]];
let started = false;

//Game loop
let gameloop = setInterval(function() {
	tick();
}, 300);
