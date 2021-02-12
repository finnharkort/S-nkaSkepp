"using strict";

//player
let pCells = document.querySelector(".player").children;
let rotateButton = document.querySelector("#rotate");
let pCellList = Array.from(pCells);
let pValueList = new Array(64);
let pSelectList = new Array(64);
let pSelectedY;
let pSelectedX;
let pBoatLength = 4;
let pBoatDir = 1;
let pBoatMax = 6;
let boatAmounts = new Array(3);

//computer
let cCells = document.querySelector(".computer").children;
let cCellList = Array.from(cCells);
let cValueList = new Array(64);
let cSelectList = new Array(64);
let cSelectedY;
let cSelectedX;
let startAddX;
let startAddY;
cBoatMax = 6;


setInterval(function log(){ 
}, 1000);

function boatMan(boatMax){
    switch(boatMax){
        case 4:
            pBoatLength = 3
            break;
        case 2:
            pBoatLength = 2;
            break;
    }
}

let curBoatArray = new Array();

document.getElementById("boatsLeft").innerHTML = pBoatMax;

for(let i=0; i<64;i++){
    pCellList = pCellList.filter((i) => i.className !== "x-value");
    pCellList = pCellList.filter((i) => i.className !== "y-value");
    cCellList = pCellList.filter((i) => i.className !== "x-value");
    cCellList = pCellList.filter((i) => i.className !== "y-value");
}

for(let i=0; i<64;i++){
    console.log(cCellList[i].value);
}

for(let i=0; i<64;i++){
    pValueList[i] = pCellList[i].value;
    cValueList[i] = cCellList[i].value;
}

for(let i=0; i<64;i++){
    pSelectList[i] = false;
    cSelectList[i] = false;
}
for(let i=0; i<64;i++){
    pCellList[i].addEventListener("mouseover", (e) => {
        e.preventDefault();
        pSelectedY = parseInt(pValueList[i].charAt(0));
        pSelectedX = parseInt(pValueList[i].charAt(2));
        displayBoat(pBoatLength,pBoatDir);
    })
    pCellList[i].addEventListener("mouseout", (e) => {
        e.preventDefault();
        pCellList[i].classList.remove("selected");
        removeBoat(pBoatLength,pBoatDir);
    })
    pCellList[i].addEventListener("click", (e) => {
        e.preventDefault();
        pSelectedY = parseInt(pValueList[i].charAt(0));
        pSelectedX = parseInt(pValueList[i].charAt(2));
        addBoat(pBoatLength,pBoatDir);
    })
}

rotateButton.addEventListener("click", (e) => {
        if(pBoatDir === 1){
            pBoatDir = 2;
        }
        else{
            pBoatDir = 1;
        }
    });


function displayBoat(length, direction){
    if(CheckOccupied(length,direction) === false && CheckEdge(length,direction, pSelectedX, pSelectedY) === false && pBoatMax > 0){
        switch(direction){
        case 1:
            for(let i=0; i<length;i++){
                pCellList[pValueList.indexOf((pSelectedY+i)+","+pSelectedX)].classList.add("selected");
            }
            break;

        case 2:
            for(let i=0; i<length;i++){
                pCellList[pValueList.indexOf(pSelectedY+","+(pSelectedX+i))].classList.add("selected");
            }
            break;
        }
    }
}

function addBoat(length, direction){
    if(CheckOccupied(length,direction) === false && CheckEdge(length,direction, pSelectedX, pSelectedY) === false && pBoatMax > 0){
        pBoatMax--;
        boatMan(pBoatMax);
        document.getElementById("boatsLeft").innerHTML = pBoatMax;
        switch(direction){
            case 1:
                for(let i=0; i<length;i++){
                    pCellList[pValueList.indexOf((pSelectedY+i)+","+pSelectedX)].classList.add("permSelected");
                    pCellList[pValueList.indexOf((pSelectedY+i)+","+pSelectedX)].classList.remove("selected");
                    pSelectList[pValueList.indexOf((pSelectedY+i)+","+pSelectedX)] = true;
                }
                break;
    
            case 2:
                for(let i=0; i<length;i++){
                    pCellList[pValueList.indexOf(pSelectedY+","+(pSelectedX+i))].classList.add("permSelected");
                    pCellList[pValueList.indexOf(pSelectedY+","+(pSelectedX+i))].classList.remove("selected");
                    pSelectList[pValueList.indexOf(pSelectedY+","+(pSelectedX+i))] = true;
                }
                break;
        }
        if(pBoatMax === 0){
            document.getElementById("rotate").classList.add("hidden");
        }
    }
}

function removeBoat(length, direction){
    if(CheckOccupied(length,direction) === false && CheckEdge(length,direction, pSelectedX, pSelectedY) === false && pBoatMax > 0){
        switch(direction){
            case 1:
                for(let i=0; i<length;i++){
                    pCellList[pValueList.indexOf((pSelectedY+i)+","+pSelectedX)].classList.remove("selected");
                }
                break;
    
            case 2:
                for(let i=0; i<length;i++){
                    pCellList[pValueList.indexOf(pSelectedY+","+(pSelectedX+i))].classList.remove("selected");
                }
                break;
        }
    }
}

function CheckOccupied(length, direction){
    switch(direction){
        case 1:
            for(let i = 0; i < length; i++){
                if(pSelectList[pValueList.indexOf((pSelectedY+i)+","+pSelectedX)] === true){
                    return true;
                }
            }
            return false;
        case 2:
            for(let i = 0; i < length; i++){
                
                if(pSelectList[pValueList.indexOf(pSelectedY+","+(pSelectedX+i))] === true){
                    return true;
                }
            }
            return false;
    }
}

function CheckEdge(length, direction, selectedX, selectedY){
    switch(direction){
        case 1:
            if((selectedY + length) > 8){
                return true;
            }
            else{
                return false;
            }
        case 2:
            if((selectedX + length) > 8){
                return true;
            }
            else{
                return false;
            }
    }
}

function ComputerAddBoats(){
    startAddX = Math.floor(Math.random()*7);
    startAddY = Math.floor(Math.random()*7);
    boatMan(cBoatMax);
    cBoatMax--;
}