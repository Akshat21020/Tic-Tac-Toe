const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Function for Initial Game conditions
function intialGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

intialGame();

//Function to change turns after each players' click
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

//Function to check if any player has won the game
function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] != "" && gameGrid[position[1]] != "" && gameGrid[position[1]] != "") 
            && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])){
        if(gameGrid[position[0]] === "X"){
            answer = "X";
        }
        else{
            answer = "O";
        }

        //Disable the cursor pointer css property
        boxes.forEach((box) =>{
           box.style.pointerEvents = "none";
        })

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
    });

    //We got a winner
    if(answer != ""){
       gameInfo.innerHTML = `Winner - ${answer}`;
       newGameBtn.classList.add("active");
       return;
    }

    //To check that if there is no winner found and all the boxes are filled
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box != ""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerHTML = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

//Function to add X and O upon clicking on the box
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        //Disabling the pointer
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check if anyone won
        checkGameOver();
    }
}

boxes.forEach((box, index) => {                                         
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",intialGame);

