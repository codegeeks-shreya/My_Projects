
//Game Constants & VAriables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('js/food.mp3');
const gameOverSound = new Audio('js/gameover.wav');
const moveSound = new Audio('js/bg.mp3');
const backgroundSound = new Audio('js/8-bit-bg-sound.mp3');//musicSound
let speed = 6; //adjust speed of the snake 
let score = 0;

let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };


//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //If you bump into yourself,
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //If you bump into the wall.
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}


function gameEngine() {
    //Part1: Updating the snake Array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        backgroundSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! . Press any key to play again.");
        snakeArr = [{ x: 13, y: 15 }];
        backgroundSound.play();
        score = 0;
    }

    //If you have eaten the food , increment the score and regenerate the food;

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore:"+ hiscoreval;
        }
        scoreBox.innerHTML = "Score" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) }
        //formula to generate random no. between two given numbers.
    }

    //Move the snake .
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i + 1] = { ...snakeArr[i] }; //"..." syntax in JavaScript is called the spread syntax or spread operator. It allows an iterable (such as an array) to be expanded into individual elements. 
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Part2: Render/Display the snake and food.
    //Display the snake.
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);

    });

    //Display the food.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}

// Main logic starts here.
backgroundSound.play();
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore:"+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };//Start the game.
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
