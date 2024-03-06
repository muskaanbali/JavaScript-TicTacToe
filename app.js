let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn")
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1 = "";
let player2 = "";
let btnX = document.getElementById("xBtn");
let btnO = document.getElementById("oBtn");
let turnO = false;

btnX.addEventListener("click", () =>{
    if(player1 == "" )
    {
        player1 = "X";
        player2 = "O";
        turnO = false;
        console.log(`player1 is ${player1} and player2 is ${player2}`);
        hideSelectionDiv();
        
    }

});
function hideSelectionDiv()
{
    var element = document.getElementsByClassName("select-symbol-container");
        for(let ele of element)
        {
            console.log(`ele is ${ele}`);
            ele.classList.add("hide");
        }

}

btnO.addEventListener("click", () =>{
    
    if(player1 == "" )
    {
        player1 = "O";
        player2 = "X";
        turnO = true;
        console.log(`player1 is ${player1} and player2 is ${player2}`);
        hideSelectionDiv()
    }

});


let count = 0;

const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach( (box) =>{
    box.addEventListener("click", () =>{
        console.log("box clicked");
        console.log(`turnO is ${turnO}`);
        if(turnO)
        {
            box.innerText = "O";
            box.style.color = "blue";
            turnO = false;  
        }
        else{
            box.innerText = "X";
            turnO = true;

        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if( count == 9 && !isWinner )
        {
            gameDraw();
        }
    });
    

});
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
  
  const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };
  
  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

const showWinner = (winner) =>{
    msg.innerText = `Congratulations!!, ${winner} is the Winner`; 
    msgContainer.classList.remove("hide");
    disableBoxes();
}

function checkWinner() {
    for (let pattern of winningPatterns) {
        //we have an array of boxes and array of patterns
        //console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText,
        //  boxes[pattern[2]].innerText);
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1);
                return true;
            }
        }

    }


}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);