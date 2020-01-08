const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d"); //gives many methods and properties.lets us create or draw in the canvas.

const box= 32;

//load images
const ground = new Image();
ground.src = 'ground.png';

const foodImg = new Image();
foodImg.src = 'food.png';

let snake = []; //snake in array

snake[0] = {  //snake with index=0
	x : 9*box,
	y : 10*box //position of the snake.
};

let food = {  //food for snake
	x : Math.floor(Math.random()*17+1) * box,
	y : Math.floor(Math.random()*15+3) * box
}
let score = 0;

let d;
document.addEventListener("keydown",direction);

function direction(event){
	let key = event.keyCode;
	if(key == 37 && d != "RIGHT"){
		
		d = 'LEFT';
		
	}
	else if (key == 38 && d != "DOWN"){
		d = "UP";
		
	}
	else if (key == 39 && d != "LEFT"){
		d = "RIGHT";
		
	}
	else if (key == 40 && d != "UP"){
		d = "DOWN";
		
	}
}
//check collision function
function collision(head,array){
	for(let i= 0; i <array.length; i++){
		if (head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}
function draw(){

//draw images.
//drawImage(imageName, X,Y, width, Height);
//X,Y == position of the image.

 	ctx.drawImage(ground , 0 , 0); //ground in 0=x-coordinate ,0=y-coordinate. 

	for( let i = 0; i <snake.length ; i++){
		ctx.fillStyle = ( i == 0)? "green" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box ,box);

		ctx.strokeStyle = "red"; //border of the snake box is red(stroke).
		ctx.strokeRect(snake[i].x, snake[i].y, box ,box);	//X,Y,width,height; //this creates white box with red stroke.
	}
	ctx.drawImage(foodImg,food.x,food.y);
	
	//old head postion
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	

	//direction of the snake movement.
	if(d == "LEFT") snakeX -= box;
	if(d == "UP") snakeY -= box;
	if(d == "RIGHT") snakeX += box;
	if(d == "DOWN") snakeY += box;

	//If the snake eats the food
	if(snakeX == food.x && snakeY == food.y){
		score++;
		//eat.play();
		food = {
			x : Math.floor(Math.random()*17+1) * box,
			y : Math.floor(Math.random()*15+3) * box
			}
			//we dont remove the tail
		}
	else {
	//remove the tail
		snake.pop(); //this pop function removes the last array value which is later unshifted to array index 0 by unshift function.
	}

	//add new head.
	let newHead = { //this create new head after the tail is poped
		x : snakeX,
		y : snakeY

	}

	//game over
	if (snakeX < box || snakeX > 17* box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake))
	{
		clearInterval(game);
		// dead.play();
	}
	snake.unshift(newHead); //this creates new head for the snake

	ctx.fillStyle = "white";
	ctx.font = "45px Change one";
	ctx.fillText(score,2*box,1.6*box);

}

let game = setInterval(draw,100); //call function draw in every 100 millisecods,
//variable game is set just incase we need to stop the game. 

