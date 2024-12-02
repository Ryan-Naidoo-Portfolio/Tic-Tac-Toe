const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox =document.querySelectorAll("section span"),

resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn =resultBox.querySelector("button");


window.onload = () => {
//makes the board clickable

for ( let i = 0 ; i < allBox.length ; i++){

    allBox[i].setAttribute("onclick","clickedBox(this)");
}

}

selectBtnX.onclick = () => {
selectBox.classList.add("hide");
playBoard.classList.add("show");

}

selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class","players active player");
    
}


let playerXIcon= "fas fa-times",playerOIcon="far fa-circle", playerSign ="X", runBot= true;


//user interaction

function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign="O";
        element.innerHTML=`<i class="${playerOIcon}"><i/>`;
        players.classList.remove("active");
        element.setAttribute("id",playerSign);
    }
    else{

        element.innerHTML= `<i class="${playerXIcon}"><i/>`;
        element.setAttribute("id",playerSign);
      players.classList.add("active");

    }

    selectWinner();
    element.style.pointerEvents="none";
    playBoard.style.pointerEvents="none";


    //buffer time

    let randomTimeDelay = ((Math.random() *1000)+200).toFixed();
    setTimeout( ()=> {
        bot(runBot);
    },randomTimeDelay);
}

//computer interaction
function bot(){
    let array = [];
    if (runBot){
        playerSign ="O"
         //find the boxes that are not marked
         for ( let i=0; i <allBox.length; i++){
            if (allBox[i].childElementCount==0){
                array.push(i);
            }
         }
         //get a random box from the tiles
         let randomBox = array[Math.floor(Math.random() * array.length)];
         if (array.length >0){
            if (players.classList.contains("player")){
                playerSign="X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"><i/>`;
                allBox[randomBox].setAttribute("id",playerSign);
                players.classList.add("active");
            }
            else{

                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"><i/>`;
                allBox[randomBox].setAttribute("id",playerSign);
                players.classList.remove("active");

            }

            selectWinner();
         }
         allBox[randomBox].style.pointerEvents="none";
         playBoard.style.pointerEvents ="auto";
         playerSign ="X";
    }
}

//get the sign of the box
function getIDVal(classname){
    return document.querySelector(".box" + classname).id;
}

//check for a match
function checkIdSign(val1,val2,val3,sign){
    if (getIDVal(val1)==sign && getIDVal(val2)==sign && getIDVal(val3)==sign && sign){
        return true;
    }
    return false;

}

//confirm winner
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
    runBot =false;
    bot(runBot);

    //buffer time to show winner

    setTimeout(()=>{
        resultBox.classList.add("show");
        playBoard.classList.remove("show"); 
    },700);
    wonText.innerHTML =`Player ${playerSign} <br> is the winner`;
    }
    else{
        //checks if the board is full
        if (getIDVal(1) !="" && getIDVal(2) !="" && getIDVal(3) !="" && getIDVal(4) !="" && getIDVal(5) !="" && getIDVal(6) !="" && getIDVal(7) !="" && getIDVal(8) !="" && getIDVal(9) !="" ){
            runBot= false;
            bot(runBot);

            //buffer time for draw
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show"); 
            },700);

            wonText.textContent ="It's A Draw";
        }
    }
}

//replay button
replayBtn.onclick = () => {
    window.location.reload();
}