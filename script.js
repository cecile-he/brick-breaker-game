var canvas = document.getElementById("playground"); //storing a reference to "playground" canvas element to the variable, canvas
var ctx = canvas.getContext("2d"); //context variable to store 2D rendering context 
var x = canvas.width/2; //x-coord of center of canvas
var y = canvas.height-30; //y-coord of almost bottom of canvas
var dx = 2; //difference in x
var dy = -2; //difference in y
var paddleHeight = 10; //height of paddle
var paddleWidth = 75; //width of paddle
var paddlePosition = (canvas.width - paddleWidth)/2; //start paddle in center
var ballRadius = 10;
var rightPressed = false; //button is not pressed yet
var leftPressed = false; //button is not pressed yet

document.addEventListener("keydown", keyDownHandler, false); //event listener: when "keydown" event is fired, keyDownHandler() is executed (when key on keyboard is pressed)
document.addEventListener("keyup", keyUpHandler, false); //event listener: when "keyup" event is fired, keyUpHandler() is executed (when keys stop being pressed)

function keyDownHandler(event) { //function sets rightPressed/leftPressed to true when the right/left arrow key is pressed 
	if(event.keyCode == 39) {
		rightPressed = true;
		console.log("right key pressed!");
	}
	else if (event.keyCode == 37) {
		leftPressed = true;
		console.log("left key pressed!");
	}
}

function keyUpHandler(event) { //function sets rightPressed/leftPressed to false when the right/left arrow key is released
	if (event.keyCode == 39) {
		rightPressed = false;
	}
	else if (event.keyCode == 37) {
		leftPressed = false;
	}
}

function drawPaddle() { //draw paddle in center of screen
	ctx.beginPath();
	ctx.rect(paddlePosition, (canvas.height-paddleHeight), paddleWidth, paddleHeight); //define top-right corner, then width and height
	ctx.fillStyle = "#fff3f7";
	ctx.fill();
	ctx.closePath();
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2); ////x and y coords of center; arc radius (10); start and end angle (rads)
	ctx.fillStyle = "#fdb1c8";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas; x and y coords of top left corner and bottom right of rectangle
	drawBall(); //call function to draw ball
	drawPaddle(); //call function to draw paddle

	if (y + dy < ballRadius || y + dy > (canvas.height - ballRadius)) { //if ball reaches top or bottom of canvas, reverse direction of the ball
		dy = -dy;
	}

	if (x + dx < ballRadius || x + dx > (canvas.width - ballRadius)) { //if ball reaches left or right edge of canvas, everse direction of the ball
		dx = -dx;
	}

	x += dx; //shift ball horizontally for next frame
	y += dy; //shift ball vertically for next frame

	if(rightPressed && paddlePosition < canvas.width - paddleWidth) { //when right key is pressed, move paddle 7px right; stop at right edge
		paddlePosition += 7;
	}
	else if (leftPressed && paddlePosition > 0) { //when left key is pressed, move paddle 7px left
		paddlePosition -= 7;
	}
}

setInterval(draw, 10);
