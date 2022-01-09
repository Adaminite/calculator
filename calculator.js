
let screen = document.querySelector("#screen");

let currOperation = ["0"];



let buttons = document.querySelectorAll(".btn");
buttons.forEach( (button) => {
    button.addEventListener('click', addClickEvent);
});


function addClickEvent(e){

    let content = e.target.textContent;

    if( (isNaN(Number(content))) ){

        if(isOperation(content)){

            if(currOperation.length === 1){
                currOperation.push(content);
            }

            else if(currOperation.length === 3){

                if(currOperation[1] === "/" && +currOperation[2] === 0){

                    alert("You cannot divide by 0!");

                }
                
                else{

                    let result = operate(currOperation[1], currOperation[0], currOperation[2]);
                    currOperation = [`${result}`];
                    currOperation.push(content);

                    if(result.toString().length > 8){
                        screen.textContent = toScientificNotation(result);
                    }

                    else{
                        screen.textContent = result;
                    }
                    

                }

            }

        }

        else if(isEquals(content)){
            
            if(currOperation.length === 3){

                if(currOperation[1] === "/" && +currOperation[2] === 0){

                    alert("You cannot divide by 0!");

                }

                else{

                    let result = operate(currOperation[1], currOperation[0], currOperation[2]);
                    currOperation = [`${result}`];  

                    if(result.toString().length > 8){
                        screen.textContent = toScientificNotation(result);
                    }

                    else{
                        screen.textContent = result;
                    }

                }

            }

        }

        else if( isClear(content) ){

            currOperation = ["0"];
            screen.textContent = "0";

        }

        else if (isPercent(content) ){

            if(currOperation.length !== 2){

                let operator = "/";
                let result = operate( operator, currOperation[currOperation.length - 1], "100");
                currOperation[currOperation.length - 1] = `${result}`;

                if(result.toString().length > 8){
                    screen.textContent = toScientificNotation(result);
                }

                else{
                    screen.textContent = result;
                }

            }
            
        }

        else if(isDecimal(content) ){


            if(currOperation.length !== 2){
                
                if(currOperation[currOperation.length - 1].indexOf('.') === -1){
                    
                    placeToAdd = currOperation.length - 1;
                    currOperation[placeToAdd] += ".";

                    if(currOperation[placeToAdd].length > 8){

                        screen.textContent = toScientificNotation(currOperation[placeToAdd]);

                    }
    
                    else{

                        screen.textContent = currOperation[placeToAdd];

                    }
                }

            }

            else{

                currOperation.push("0" + content);

                screen.textContent = "0" + content;

            }


        }
        else{

            if(currOperation.length !== 2){

                let posToModify = currOperation.length - 1;
                let operand = currOperation[posToModify];

                if(+operand !== 0){

                    let newOperand;

                    if(operand.length > 1){

                        newOperand = operand.substring(0, operand.length - 1);
                        currOperation[posToModify] = newOperand;

                    }

                    else{

                        newOperand = "0";
                        currOperation[posToModify] = newOperand;

                    }

                    if(newOperand.length > 8){

                        screen.textContent = toScientificNotation(newOperand);

                    }

                    else{

                        screen.textContent = newOperand;

                    }
                    
                }
            }
        }
    }

    else{
        if(shouldAddNewNumber()){
            currOperation.push(content);
        }

        else{
            appendNumber(content);
        }

        let operand = currOperation[currOperation.length - 1];

        if(operand.length > 8){

            screen.textContent = toScientificNotation(operand);

        }
        else{

            screen.textContent = currOperation[currOperation.length - 1];

        }

    }
}


function toScientificNotation(x){
    return Number.parseFloat(x).toExponential(2);
}

function isOperation(string){

    return (string === "+" || string === "-" || string === "*" || string === "/");

}

function isEquals(string){

    return (string === "=");

}

function isClear(string){

    return (string === "CE");

}

function isPercent(string){

    return (string === "%");

}

function isDecimal(string){
    return(string === ".");
}
function shouldAddNewNumber(){

    return isOperation(currOperation[currOperation.length - 1]);

}

function appendNumber(num){

    let placeToAdd = currOperation.length - 1;

    if(currOperation[placeToAdd] === "0"){

        currOperation[placeToAdd] = num;

    }   

    else{

        currOperation[placeToAdd] += num;

    }

}

function operate(operator, x, y){

    let result;

    if(operator === "+"){
        result = add(+x, +y);
    }

    else if(operator === "-"){
        result = subtract(+x, +y);
    }

    else if(operator === "*"){
        result = multiply(+x, +y);
    }

    else{
        result = divide(+x, +y);
    }

    return result;

}

function add(x, y){

    return x + y;

}

function multiply(x, y){

    return Math.round((x * y) * 100) / 100;

}

function subtract(x, y){

    return x - y;

}

function divide(x, y){

    return Math.round((x / y) * 100) / 100;

}
