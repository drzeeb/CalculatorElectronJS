// Use npm lib mathjs to easily calculate the expressions
const math = require('mathjs');
// Define the screen global
const screen = document.getElementById('screen');
// Add eventlistener for keypress
document.addEventListener('keydown', pressedKey);

// Add eventlistener for the buttons on the surface
var btns = document.querySelectorAll('[data-val]');
[].forEach.call(btns, (btn)=>{
    var val = btn.getAttribute('data-val');
    if(val == "C") {
        btn.addEventListener('click', function(){clearScreen(screen)},false);
    } else if(val == "result") {
        btn.addEventListener('click', function(){getResult(screen)},false);
    } else {
        btn.addEventListener('click', function(){appendScreen(screen, val)},false);
    }
});
// Bind keyinput to functions
// Digits and arithmetic operations appending directly to the screen
// Del clears the screen and Enter computes the result
function pressedKey(e) {
    switch(e.key){
        case '0': appendScreen(screen, '0');
        break;
        case '1': appendScreen(screen, '1');
        break;
        case '2': appendScreen(screen, '2');
        break;
        case '3': appendScreen(screen, '3');
        break;
        case '4': appendScreen(screen, '4');
        break;
        case '5': appendScreen(screen, '5');
        break;
        case '6': appendScreen(screen, '6');
        break;
        case '7': appendScreen(screen, '7');
        break;
        case '8': appendScreen(screen, '8');
        break;
        case '9': appendScreen(screen, '9');
        break;
        case '+': appendScreen(screen, '+');
        break;
        case '-': appendScreen(screen, '-');
        break;
        case '*': appendScreen(screen, '\u00D7');
        break;
        case '/': appendScreen(screen, '\u00F7');
        break;
        case '(': appendScreen(screen, '(');
        break;
        case ')': appendScreen(screen, ')');
        break;
        case ',': appendScreen(screen, ',');
        break;
        case '%': appendScreen(screen, '%');
        break;
        case 'Enter': getResult(screen);
        break;
        case 'Delete': clearScreen(screen);
        break;
    }
}
// Function to append the prameter val on the screen
function appendScreen(screen, val) {
    screen.value = screen.value + val;
}
// Clear screen
function clearScreen(screen) {
    screen.value = '';
}
// Compute the result
function getResult(screen) {
    var input = screen.value;
    
    input = cleanInput(input);
    var result = 0.0;
    result = calc(input);
    if(result!='error') {
        //Change dot to comma for a intelligible output
        result = replaceDotComma(result.toString());

        // Print result
        clearScreen(screen);
        appendScreen(screen, result);
    } else {
        // When checkInput failed show the user a error message
        screen.value = 'No valid input';
    }
}
// We need to clean the given input on the screen. Replace , with . to get
// a float. replace × with * to multiply and replace ÷ with / to divide
function cleanInput(input) {
    input = input.split('²').join('^2');
    if(input.indexOf('√')!=-1) {
        let tempInput = '';
        let root = false;
        for(let c of input) {
            console.log(c);
            if(c == '√') {
                root = true;
                tempInput += 'sqrt(';
            } else if (root) {
                if(!isNaN(c) || c == ',') {
                    tempInput +=c;
                } else {
                    tempInput +=')';
                    tempInput +=c;
                    root = false;
                }
            } else {
                tempInput += c;
            }
            console.log(tempInput);
        };
        if(root) {
            tempInput +=')';
        }
        input = tempInput;
    }
    input = input.split('×').join('*');
    input = input.split('÷').join('/');
    input = input.split(',').join('.');
    console.log(input);
    return input;
}
// Replace for a intelligible output
function replaceDotComma(input) {
    input = input.split('.').join(',');
    return input;
}

// Calculate the standard arithmetic operations
function calc(input) {
    var result;
    try {
        result = math.eval(input);
    } catch (err) {
        //alert(err.message);
        return 'error';
    }
    return +result.toPrecision(4);
}