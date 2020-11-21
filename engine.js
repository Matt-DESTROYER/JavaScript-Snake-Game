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
		switch (e.keyCode) {
				// WASD
			case 87:
				if (dir != 2) {
					dir = 1;
				}
				break;
			case 83:
				if (dir != 1) {
					dir = 2;
				}
				break;
			case 65:
				if (dir != 4) {
					dir = 3;
				}
				break;
			case 68:
				if (dir != 3) {
					dir = 4;
				}
				break;
				
				// ARROWS
			case 38:
				if (dir != 2) {
					dir = 1;
				}
				break;
			case 40:
				if (dir != 1) {
					dir = 2;
				}
				break;
			case 37:
				if (dir != 4) {
					dir = 3;
				}
				break;
			case 39:
				if (dir != 3) {
					dir = 4;
				}
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
				tailX = [];
				tailY = [];
				break;
		}
	}
}

// Draw Frame
function drawFrame() {
	canvCtx.beginPath();
	canvCtx.clearRect(0,0, canv.width, canv.height);
	
	// Render snake
	canvCtx.fillStyle = "green";
	canvCtx.fillRect(x, y, 25, 25);
	for (let i = 0; i < score; i++) {
		canvCtx.fillRect(tailX[i], tailY[i], 25, 25);
	}
	
	// Render apple
	canvCtx.fillStyle = "red";
	canvCtx.fillRect(ax, ay, 25, 25);
	canvCtx.closePath;
	canvCtx.fill;
	
	// Render score
	canvCtx.fillStyle = "black";
	canvCtx.font = "20px Arial";
	canvCtx.fillText("Score: " + score, 10, 25);
}

// Draw "Game Over" Screen
function drawGameOver() {
	canvCtx.beginPath();
	canvCtx.clearRect(0,0, canv.width, canv.height);
	canvCtx.fillStyle = "black";
	canvCtx.font = "20px Arial";
	canvCtx.fillText("Game over!", canv.width / 7, canv.height - 350);
	canvCtx.fillText("Your final score was: " + score, canv.width / 7, canv.height - 300);
	canvCtx.fillText("Press space to play again.", canv.width / 7, canv.height - 250);
	canvCtx.closePath;
	canvCtx.fill;
}

// Update positioning variables and sense if off screen
function positioning() {
	if (exit === false) {
		// Tail
		tailX[0] = x;
		tailY[0] = y;
		if (score > 0) {
			for (let i = score; i > 0; i--) {
				tailX[i] = tailX[i - 1];
				tailY[i] = tailY[i - 1];
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
		
		// Apple
		if (x === ax) {
			if (y === ay) {
				ax = Math.round(Math.random() * 20) * 25;
				ay = Math.round(Math.random() * 10) * 25;
				score++;
				tailX.push(tailX[tailX.length - 1]);
				tailY.push(tailY[tailY.length - 1]);
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
				if (x === tailX[i]) {
					if (y === tailY[i]) {
						exit = true;
					}
				}
			}
		}
	}
}

function tick() {
	if (pause === false) {
		if (exit === false) {
			positioning();
			drawFrame();
		} else {
			drawGameOver();
		}
	}
}

//Initialise
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
let tailX = [0];
let tailY = [0];

//Game loop
let gameloop = setInterval(function() {
	tick();
}, 300);
