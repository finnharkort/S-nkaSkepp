"use strict";

//checklist 2020-02-18
/*
 - make it impossible to place boats one cell from eachother
 - add ability to remove and place a boat, this because it is possible to lay out boats in such a way that 
    you can no longer place another boat
 - add start screen
 - maybe add different difficulties
 - big code cleanup is needed (some algorithms are used over and over again: 
    create a function or variable for this)
 - comment all code
*/

//player
let pCells = document.querySelector(".player").children;
let rotateButton = document.querySelector("#rotate");
let pCellList = Array.from(pCells);
let pValueList = new Array(64);
let pSelectList = new Array(64);
let playerY;
let playerX;
let playerAdd = true;
let playerGuess = new Array(64);
let guessMaxPlayer = 18;

//computer
let cCells = document.querySelector(".computer").children;
let cCellList = Array.from(cCells);
let cValueList = new Array(64);
let cSelectList = new Array(64);
let computerX;
let computerY;
let computerGuess = new Array(64);
let guessMaxComputer = 18;

//both
let boatLength = 4;
let boatDir = 1;
let boatMaxAmount = 6;


SetupPlayer();
SetupComputer();
AddListenersPlayer();
AddListenersComputer();
document.getElementById("boatsLeft").innerHTML = boatMaxAmount;

function boatMan() {
    switch (boatMaxAmount) {
        case 6:
            boatLength = 4;
            break;
        case 4:
            boatLength = 3;
            break;
        case 2:
            boatLength = 2;
            break;
        case 0:
            boatMaxAmount = 6;
            playerAdd = false;
            ComputerBoardBoats();
            break;
    }
}

function SetupPlayer() {
    for (let i = 0; i < 64; i++) {
        pCellList = pCellList.filter((i) => i.className !== "x-value");
        pCellList = pCellList.filter((i) => i.className !== "y-value");
    }

    for (let i = 0; i < 64; i++) {
        pValueList[i] = pCellList[i].value;
    }

    for (let i = 0; i < 64; i++) {
        pSelectList[i] = false;
        playerGuess[i] = false;
    }
}

function SetupComputer(){
    for (let i = 0; i < 64; i++) {
        cCellList = cCellList.filter((i) => i.className !== "x-value");
        cCellList = cCellList.filter((i) => i.className !== "y-value");
    }
    for (let i = 0; i < 64; i++) {
        cValueList[i] = cCellList[i].value;
    }
    for (let i = 0; i < 64; i++) {
        cSelectList[i] = false;
        computerGuess[i] = false;
    }
}

function AddListenersPlayer() {
    for (let i = 0; i < 64; i++) {
        pCellList[i].addEventListener("mouseover", (e) => {
            e.preventDefault();
            playerY = parseInt(pValueList[i].charAt(0));
            playerX = parseInt(pValueList[i].charAt(2));
            displayBoat(boatLength, boatDir);
        });
        pCellList[i].addEventListener("mouseout", (e) => {
            e.preventDefault();
            pCellList[i].classList.remove("selected");
            removeBoat(boatLength, boatDir);
        });
        pCellList[i].addEventListener("click", (e) => {
            e.preventDefault();
            playerY = parseInt(pValueList[i].charAt(0));
            playerX = parseInt(pValueList[i].charAt(2));
            AddBoatPlayer(boatLength, boatDir);
        });
    }
    rotateButton.addEventListener("click", (e) => {
        if (boatDir === 1) {
        boatDir = 2;
        } else {
        boatDir = 1;
        }
    });
}

function AddListenersComputer(){
    for (let i = 0; i < 64; i++) {
        cCellList[i].addEventListener("click", (e) => {
            e.preventDefault();
            let a = parseInt(cValueList[i].charAt(0));
            let b = parseInt(cValueList[i].charAt(2));
            if(computerGuess[cValueList.indexOf((a) + "," + b)] === false){
                computerGuess[i] = true;
                BoatGuessComputer();
                if (cSelectList[cValueList.indexOf((a) + "," + b)] === true) {
                    cCellList[i].innerHTML = "<img src=\"X.png\">";
                    guessMaxPlayer--;
                    if(guessMaxPlayer === 0){
                        console.log("player wins");
                    }
                    return true;
                }
                else{
                    cCellList[i].innerHTML = "<img src=\"O.png\">";
                }
            }
            
        });
    }
}

function displayBoat(length, direction) {
    if (
    CheckPlacement(length, direction, playerX, playerY, pSelectList, pValueList) === true &&
    playerAdd == true){
        switch (direction) {
        case 1:
            for (let i = 0; i < length; i++) {
            pCellList[
                pValueList.indexOf(playerY + i + "," + playerX)
            ].classList.add("selected");
            }
            break;

        case 2:
            for (let i = 0; i < length; i++) {
            pCellList[
                pValueList.indexOf(playerY + "," + (playerX + i))
            ].classList.add("selected");
            }
            break;
        }
    }
}

function AddBoatPlayer(length, direction) {
    if (
    CheckPlacement(length, direction, playerX, playerY, pSelectList, pValueList) === true &&
    playerAdd == true){
        boatMaxAmount--;
        
        document.getElementById("boatsLeft").innerHTML = boatMaxAmount;
        switch (direction) {
            case 1:
                for (let i = 0; i < length; i++) {
                    if(i === 0){
                        pCellList[
                        pValueList.indexOf(playerY + i + "," + playerX)
                        ].classList.add("edgeTop");
                    }
                    else if(i === length - 1){
                        pCellList[
                        pValueList.indexOf(playerY + i + "," + playerX)
                        ].classList.add("edgeBottom");
                    }
                    
                    else{
                        pCellList[
                        pValueList.indexOf(playerY + i + "," + playerX)
                        ].classList.add("edge");
                    }
                
                    pCellList[
                        pValueList.indexOf(playerY + i + "," + playerX)
                    ].classList.add("permSelected");
                    pCellList[
                        pValueList.indexOf(playerY + i + "," + playerX)
                    ].classList.remove("selected");
                    pSelectList[
                        pValueList.indexOf(playerY + i + "," + playerX)
                    ] = true;
                }
                break;
            case 2:
                for (let i = 0; i < length; i++) {
                    if(i === 0){
                        pCellList[
                        pValueList.indexOf(playerY + "," + (playerX + i))
                        ].classList.add("edgeLeft");
                    }
                    else if(i === length - 1){
                        pCellList[
                        pValueList.indexOf(playerY + "," + (playerX + i))
                        ].classList.add("edgeRight");
                    }
                    else{
                        pCellList[
                        pValueList.indexOf(playerY + "," + (playerX + i))
                        ].classList.add("edgeFlip");
                    }

                    pCellList[
                        pValueList.indexOf(playerY + "," + (playerX + i))
                    ].classList.add("permSelected");
                    pCellList[
                        pValueList.indexOf(playerY + "," + (playerX + i))
                    ].classList.remove("selected");
                    pSelectList[
                        pValueList.indexOf(playerY + "," + (playerX + i))
                    ] = true;
                }
                break;
            }
            boatMan();
        if (boatMaxAmount === 0) {
            document.getElementById("rotate").classList.add("hidden");
        }
    }
}

function AddBoatComputer(length, direction){
    switch(direction){
        case 1:
            for (let i = 0; i < length; i++) {
                // if(i === 0){
                //     cCellList[
                //     cValueList.indexOf(computerY + i + "," + computerX)
                //     ].classList.add("edgeTop");
                // }
                // else if(i === length - 1){
                //     cCellList[
                //     cValueList.indexOf(computerY + i + "," + computerX)
                //     ].classList.add("edgeBottom");
                // }
                
                // else{
                //     cCellList[
                //     cValueList.indexOf(computerY + i + "," + computerX)
                //     ].classList.add("edge");
                // }   
                cSelectList[cValueList.indexOf(computerY + i + "," + computerX)] = true;
                // cCellList[
                //         cValueList.indexOf(computerY + i + "," + (computerX))
                //     ].classList.add("permSelectedComp");
            }
            break;
        case 2:
            for (let i = 0; i < length; i++) {
                // if(i === 0){
                //     cCellList[
                //     cValueList.indexOf(computerY + "," + (computerX + i))
                //     ].classList.add("edgeLeft");
                // }
                // else if(i === length - 1){
                //     cCellList[
                //     cValueList.indexOf(computerY + "," + (computerX + i))
                //     ].classList.add("edgeRight");
                // }
                
                // else{
                //     cCellList[
                //     cValueList.indexOf(computerY + "," + (computerX + i))
                //     ].classList.add("edgeFlip");
                // }   
                cSelectList[cValueList.indexOf(computerY + "," + (computerX + i))] = true;
                // cCellList[
                //         cValueList.indexOf(computerY + "," + (computerX + i))
                //     ].classList.add("permSelectedComp");
            }
            break;
    }
}

function BoatGuessComputer(){
    let check = false;
    while(check === false){
        let guessX = Math.floor(Math.random() * 8);
        let guessY = Math.floor(Math.random() * 8); 
        if(playerGuess[pValueList.indexOf((guessY) + "," + guessX)] === false){
            playerGuess[pValueList.indexOf((guessY) + "," + guessX)] = true;
            if (pSelectList[pValueList.indexOf((guessY) + "," + guessX)] === true) {
                pCellList[pValueList.indexOf(guessY + "," + guessX)].innerHTML = "<img src=\"X.png\">";
                guessMaxComputer--;
                if(guessMaxComputer === 0){
                    console.log("computer wins");
                }
            }
            else{
                pCellList[pValueList.indexOf(guessY + "," + guessX)].innerHTML = "<img src=\"O.png\">";
            }
            check = true;
        }
    }

}

function CheckPlacement(length, direction, x, y, selectList, valueList){
    if(
    CheckOccupied(length, direction, x, y, selectList, valueList) === false &&
    CheckEdge(length, direction, x, y) === false){
        return true;
    }
}

function removeBoat(length, direction) {
  if (
    CheckPlacement(length, direction, playerX, playerY, pSelectList, pValueList) === true &&
    playerAdd == true
  ) {
    switch (direction) {
      case 1:
        for (let i = 0; i < length; i++) {
          pCellList[
            pValueList.indexOf(playerY + i + "," + playerX)
          ].classList.remove("selected");
        }
        break;

      case 2:
        for (let i = 0; i < length; i++) {
          pCellList[
            pValueList.indexOf(playerY + "," + (playerX + i))
          ].classList.remove("selected");
        }
        break;
    }
  }
}

function ComputerBoardBoats(){
    while(boatMaxAmount > 0) {
        computerX = Math.floor(Math.random() * 8);
        computerY = Math.floor(Math.random() * 8);
        let computerDir = Math.floor(Math.random() * 2) + 1;
        boatMan();
        if(CheckPlacement(boatLength, computerDir, computerX, computerY, cSelectList, cValueList)){
            AddBoatComputer(boatLength, computerDir);
            boatMaxAmount--;
        }
    }
}

function CheckOccupied(length, direction, x, y, selectList, valueList) {
  switch (direction) {
    case 1:
      for (let i = 0; i < length; i++) {
        if (
          selectList[valueList.indexOf((y + i) + "," + x)] ===
          true
        ) {
          return true;
        }
      }
      return false;
    case 2:
      for (let i = 0; i < length; i++) {
        if (
          selectList[
            valueList.indexOf(y + "," + (x + i))
          ] === true
        ) {
          return true;
        }
      }
      return false;
  }
}

function CheckEdge(length, direction, x, y) {
  switch (direction) {
    case 1:
      if (y + length > 8) {
        return true;
      } else {
        return false;
      }
    case 2:
      if (x + length > 8) {
        return true;
      } else {
        return false;
      }
  }
}
