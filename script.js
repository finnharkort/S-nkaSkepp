"using strict";

let rows = new Array(8);
let guessed = false;
let cells = document.querySelector(".player").children;
let cellList = Array.from(cells);
let valueList = new Array(64);
let longer;
let selectedY;
let selectedX;
let clicked = false;
let permSelect;

let curBoatArray = new Array();

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
        cellList[i].classList.add("selected");
        displayBoat(4,1);
    })
    cellList[i].addEventListener("mouseout", (e) => {
        e.preventDefault();
        cellList[i].classList.remove("selected");
        
            removeBoat(4,1);
    })
    cellList[i].addEventListener("click", (e) => {
        e.preventDefault();
        console.log("hej");
        selectList[i] = true;
        cellList[i].classList.add("selected");
        selectedY = parseInt(valueList[i].charAt(0));
        selectedX = parseInt(valueList[i].charAt(2));
        addBoat(4,1);
        
    })
}

function displayBoat(length, direction){
    switch(direction){
        case 1:
            for(let i=0; i<length;i++){
                cellList[valueList.indexOf((selectedY+i)+","+selectedX)].classList.add("selected");
            }
            break;

        case 2:
            console.log("hej");
            for(let i=0; i<length;i++){
                cellList[valueList.indexOf(selectedY+","+(selectedX+i))].classList.add("selected");
            }
            break;
    }
}

function addBoat(length, direction){
    switch(direction){
        case 1:
            for(let i=0; i<length;i++){
                cellList[valueList.indexOf((selectedY+i)+","+selectedX)].classList.add("permSelected");
                cellList[valueList.indexOf((selectedY+i)+","+selectedX)].classList.remove("selected");
            }
            break;

        case 2:
            console.log("hej");
            for(let i=0; i<length;i++){
                cellList[valueList.indexOf(selectedY+","+(selectedX+i))].classList.add("permSelected");
                cellList[valueList.indexOf((selectedY)+","+selectedX+i)].classList.remove("selected");
            }
            break;
    }
}

function removeBoat(length, direction){
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








for(let i=0; i<8;i++){
    rows[i] = new Array(8);
}

for(let i=0; i<8;i++){
    for(let j=0; j<8;j++){
        rows[i][j] = guessed;
    }
}

function CreateBoat(size, direction, a, b){
    if((a < 8 && a > -1) && (b < 8 && b > -1) && (CheckOccupied(size, direction, a, b) == false)){
        switch(direction){
            case 1:
                if((b+size) < 9){
                    for(let i = 0; i < size; i++){
                        rows[a][b+i] = true;
                    }
                }
                else{
                    console.log("Stopp det går inte");
                }
                break;
            case 2:
                if((a + size) < 9){
                    for(let i = 0; i < size; i++){
                        rows[a+i][b] = true;
                    }
                }
                else{
                    console.log("Stopp det går inte");
                }
                break;
    
        }

    }
    else{
        console.log("Stopp det går inte");
    }
}

function CheckOccupied(size, direction, a, b){
    switch(direction){
        case 1:
            for(let i = 0; i < size; i++){
                if(rows[a][b+i] == true){
                    return true;
                }
            }
            return false;
        case 2:
            for(let i = 0; i < size; i++){
                if(rows[a+i][b] == true){
                        return true;
                    }
            }
            return false;
    }
}

CreateBoat(4,1,2,1);
CreateBoat(3,2,0,2);

console.table(rows);