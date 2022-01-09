
let screen = document.querySelector("#screen");

let currOperation = ["0"];



let buttons = document.querySelectorAll(".btn");
buttons.forEach( (button) => {
    button.addEventListener('click', addClickEvent);
});


function addClickEvent(e){
    let content = e.target.textContent;
    console.log(content);

    if( (Number(content).isNaN()) ){
        if(isOperation(string)){
            
        }
    }

    else{

    }
}

function isOperation(string){
    return (string === "+" || string === "-" || string === "*" || string === "/");
}

function appendNumber(stringNum){

}



function add(x, y){
    return x + y;
}

function multiply(x, y){
    return x * y;
}

function subtract(x, y){
    return x - y;
}

function divide(x, y){
    return Math.round((x / y) * 10000) / 10000;
}

