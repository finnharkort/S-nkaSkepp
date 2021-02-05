"using strict";

//let rows = new Array(8);
//let guessed = false;
let cells = document.querySelector(".player").children;
let rotateButton = document.querySelector("#rotate");
let cellList = Array.from(cells);
let valueList = new Array(64);
let selectList = new Array(64);
//let longer;
let selectedY;
let selectedX;
let clicked = false;
let testLength = 4;
let testDir = 1;
let boatMax = 6;
let boatAmounts = new Array(3);

setInterval(function log(){ 
}, 1000);

function boatMan(){
    switch(boatMax){
        case 4:
            testLength = 3
            break;
        case 2:
            testLength = 2;
            break;
    }
}

let curBoatArray = new Array();

document.getElementById("boatsLeft").innerHTML = boatMax;

for(let i=0; i<64;i++){
    cellList = cellList.filter((i) => i.className !== "x-value");
    cellList = cellList.filter((i) => i.className !== "y-value");
}

for(let i=0; i<64;i++){
    console.log(cellList[i].value);
}

for(let i=0; i<64;i++){
    valueList[i] = cellList[i].value;
}

for(let i=0; i<64;i++){
    selectList[i] = false;
}
for(let i=0; i<64;i++){
    cellList[i].addEventListener("mouseover", (e) => {
        e.preventDefault();
        selectedY = parseInt(valueList[i].charAt(0));
        selectedX = parseInt(valueList[i].charAt(2));
        displayBoat(testLength,testDir);
    })
    cellList[i].addEventListener("mouseout", (e) => {
        e.preventDefault();
        cellList[i].classList.remove("selected");
        
            removeBoat(testLength,testDir);
    })
    cellList[i].addEventListener("click", (e) => {
        e.preventDefault();
        selectedY = parseInt(valueList[i].charAt(0));
        selectedX = parseInt(valueList[i].charAt(2));
        addBoat(testLength,testDir);
        
    })
}

rotateButton.addEventListener("click", (e) => {
        if(testDir === 1){
            testDir = 2;
        }
        else{
            testDir = 1;
        }
    });


function displayBoat(length, direction){
    if(CheckOccupied(length,direction) === false && CheckEdge(length,direction) === false && boatMax > 0){
        switch(direction){
        case 1:
            for(let i=0; i<length;i++){
                cellList[valueList.indexOf((selectedY+i)+","+selectedX)].classList.add("selected");
            }
            break;

        case 2:
            for(let i=0; i<length;i++){
                cellList[valueList.indexOf(selectedY+","+(selectedX+i))].classList.add("selected");
            }
            break;
        }
    }
}

function addBoat(length, direction){
    if(CheckOccupied(length,direction) === false && CheckEdge(length,direction) === false && boatMax > 0){
        boatMax--;
        boatMan();
        document.getElementById("boatsLeft").innerHTML = boatMax;
        switch(direction){
            case 1:
                for(let i=0; i<length;i++){
                    cellList[valueList.indexOf((selectedY+i)+","+selectedX)].classList.add("permSelected");
                    cellList[valueList.indexOf((selectedY+i)+","+selectedX)].classList.remove("selected");
                    selectList[valueList.indexOf((selectedY+i)+","+selectedX)] = true;
                }
                break;
    
            case 2:
                for(let i=0; i<length;i++){
                    cellList[valueList.indexOf(selectedY+","+(selectedX+i))].classList.add("permSelected");
                    cellList[valueList.indexOf(selectedY+","+(selectedX+i))].classList.remove("selected");
                    selectList[valueList.indexOf(selectedY+","+(selectedX+i))] = true;
                }
                break;
        }
    }
}

function removeBoat(length, direction){
    if(CheckOccupied(length,direction) === false && CheckEdge(length,direction) === false && boatMax > 0){
        switch(direction){
            case 1:
                for(let i=0; i<length;i++){
                    cellList[valueList.indexOf((selectedY+i)+","+selectedX)].classList.remove("selected");
                }
                break;
    
            case 2:
                for(let i=0; i<length;i++){
                    cellList[valueList.indexOf(selectedY+","+(selectedX+i))].classList.remove("selected");
                }
                break;
        }
    }
}

function CheckOccupied(length, direction){
    switch(direction){
        case 1:
            for(let i = 0; i < length; i++){
                if(selectList[valueList.indexOf((selectedY+i)+","+selectedX)] === true){
                    return true;
                }
            }
            return false;
        case 2:
            for(let i = 0; i < length; i++){
                
                if(selectList[valueList.indexOf(selectedY+","+(selectedX+i))] === true){
                    return true;
                }
            }
            return false;
    }
}

function CheckEdge(length, direction){
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




// for(let i=0; i<8;i++){
//     rows[i] = new Array(8);
// }

// for(let i=0; i<8;i++){
//     for(let j=0; j<8;j++){
//         rows[i][j] = guessed;
//     }
// }

// function CreateBoat(size, direction, a, b){
//     if((a < 8 && a > -1) && (b < 8 && b > -1) && (CheckOccupied(size, direction, a, b) == false)){
//         switch(direction){
//             case 1:
//                 if((b+size) < 9){
//                     for(let i = 0; i < size; i++){
//                         rows[a][b+i] = true;
//                     }
//                 }
//                 else{
//                     console.log("Stopp det går inte");
//                 }
//                 break;
//             case 2:
//                 if((a + size) < 9){
//                     for(let i = 0; i < size; i++){
//                         rows[a+i][b] = true;
//                     }
//                 }
//                 else{
//                     console.log("Stopp det går inte");
//                 }
//                 break;
    
//         }

//     }
//     else{
//         console.log("Stopp det går inte");
//     }
// }

// function CheckOccupied1(size, direction, a, b){
//     switch(direction){
//         case 1:
//             for(let i = 0; i < size; i++){
//                 if(rows[a][b+i] == true){
//                     return true;
//                 }
//             }
//             return false;
//         case 2:
//             for(let i = 0; i < size; i++){
//                 if(rows[a+i][b] == true){
//                         return true;
//                     }
//             }
//             return false;
//     }
// }

// CreateBoat(4,1,2,1);
// CreateBoat(3,2,0,2);

// console.table(rows);