var canvas = document.getElementById("playground"); //storing a reference to "playground" canvas element to the variable, canvas
var ctx = canvas.getContext("2d"); //context variable to store 2D rendering context 

var x = canvas.width/2; //x-coord of center of canvas
var y = canvas.height-30; //y-coord of almost bottom of canvas

var dx = 2; //difference in x
var dy = -2; //difference in y

var paddleHeight = 10; //height of paddle
var paddleWidth = 75; //width of paddle
var paddleStart = (canvas.width - paddleWidth)/2; //start paddle in center

var ballRadius = 10;

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleStart, (canvas.height-paddleHeight), paddleWidth, paddleHeight); //define top-right corner, then width and height
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

	if (y + dy < ballRadius || y + dy > (canvas.height - ballRadius)) { //if ball reaches top or bottom of canvas, reverse direction of the ball
		dy = -dy;
	}

	if (x + dx < ballRadius || x + dx > (canvas.width - ballRadius)) { //if ball reaches left or right edge of canvas, everse direction of the ball
		dx = -dx;
	}

	x += dx; //shift ball horizontally for next frame
	y += dy; //shift ball vertically for next frame
}


setInterval(draw, 10);
drawPaddle();
