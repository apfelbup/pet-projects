const gamePopup = document.getElementById('game-popup');
const start = document.getElementById('start');
const info = document.getElementById('game-info');
const main = document.getElementById('game-main');
const closeGame = document.getElementById('game-close');
const restart = document.getElementById('restart');
const table = document.getElementById('field');

closeGame.onclick = function(){
    gamePopup.classList.remove('active');
}

let intervalId = 0;
const handleGeneration = (fun,count) => {
    if(intervalId > 0){
        clearInterval(intervalId);
        intervalId = 0;
    } else {
        intervalId = setInterval(fun,count);
    }
}

restart.onclick = () => {
    main.style.display = "none";
    info.style.display = "block";
    table.innerHTML = '';
    handleGeneration();

}




const size =50;
let htmlElements;
let cells; 
const EMPTY = 0;
const ALIVE = 1;

function createField() {
    htmlElements = [];
    cells =[];
    for (let y = 0; y < size; y++) {
        let tr = document.createElement('tr');
        let tdElements = [];
        cells.push(new Array(size).fill(EMPTY));
        htmlElements.push(tdElements);
        table.appendChild(tr);
        for (let x = 0; x < size; x++) {
            let td = document.createElement('td');
            tdElements.push(td);
            tr.appendChild(td);
        }
        
    }
}


function draw() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            htmlElements[y][x].setAttribute('class','cell' + (cells[y][x] == 1?'filled':'empty'));
        }
        
    }
}


function countNeibhours(x,y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const nx = (x+dx+size)%size;
            const ny = (y+dy+size) % size;
            count = count+cells[ny][nx];
        }
    }
    return count - cells[y][x];
}

function newGeneration(){
    const newCells = [];
    for (let i = 0; i < size; i++) {
        newCells.push(new Array(size).fill(EMPTY));
    }
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let neibhours = countNeibhours(x,y);
            if(cells[y][x] == EMPTY && neibhours == 3){
                newCells[y][x] = ALIVE;
            }
            if(cells[y][x]==ALIVE && (neibhours ==2 || neibhours == 3)) {
                newCells[y][x] = ALIVE;
            }
        }
    }
    cells= newCells;
    draw();
}



function initGame() {
    createField();
    for (let i = 0; i < Math.floor(size*size*0.3); i++) {
        let x,y;
        do{
            x = Math.floor(Math.random()*size), y = Math.floor(Math.random()*size);
            if(cells[y][x] == EMPTY){
                cells[y][x] = ALIVE;
                break;
            }
            i++;
        } while(i<true);
    }
    draw();
    handleGeneration(newGeneration,100);
}



start.onclick = ()=>{
    info.style.display = "none";
    initGame();
    main.style.display = "block";

}




