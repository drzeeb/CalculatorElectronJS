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
    if(checkInput(input)) {
        //Get value as float
        if(input.indexOf("+") != -1) {
            var val1 = parseFloat(input.split('+')[0]);
            var val2 = parseFloat(input.split('+')[1]);
            result = calc("+", val1, val2);
        } else if(input.indexOf("-") != -1) {
            var val1 = parseFloat(input.split('-')[0]);
            var val2 = parseFloat(input.split('-')[1]);
            result = calc("-", val1, val2);
        } else if(input.indexOf("*") != -1) {
            var val1 = parseFloat(input.split('*')[0]);
            var val2 = parseFloat(input.split('*')[1]);
            result = calc("*", val1, val2);
        }  else if(input.indexOf("/") != -1) {
            var val1 = parseFloat(input.split('/')[0]);
            var val2 = parseFloat(input.split('/')[1]);
            result = calc("/", val1, val2);
        } else if(input.indexOf("square") != -1){
            var val1 = parseFloat(input.split('square')[0]);
            result = calc("square", val1, 0);
        } else if(input.indexOf("root") != -1){
            var val1 = parseFloat(input.split('root')[0]);
            result = calc("root", val1, 0);
        }
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
// Check with regex, if the input is valid example 2+2 or 3.4*0.5
function checkInput(input) {
    var squarePattern = new RegExp("[+-]?([0-9]+[.])?[0-9]+(?=square)");
    var rootPattern = new RegExp("[+-]?([0-9]+[.])?[0-9]+(?=root)");
    var pattern = new RegExp("([0-9]+[\\+\\-\\*\\/]{1}[0-9]+)+([\\+\\-\\*\\/]{1}[0-9]+)*");
    if(pattern.test(input) || squarePattern.test(input) || rootPattern.test(input)) {
        return true;
    } else {
        return false;
    }
}
// We need to clean the given input on the screen. Replace , with . to get
// a float. replace × with * to multiply and replace ÷ with / to divide
function cleanInput(input) {
    input = input.replace('²', 'square');
    input = input.replace('√', 'root');
    input = input.replace('×', '*');
    input = input.replace('÷', '/');
    input = input.replace(/,/g, '.');
    return input;
}
// Replace for a intelligible output
function replaceDotComma(input) {
    input = input.replace('.', ',');
    return input;
}

// Calculate the standard arithmetic operations
function calc(method, val1, val2) {

    var result;
    switch(method) {
        case '+': result = val1+val2;
        break;
        case '-': result = val1-val2;
        break;
        case '*': result = val1*val2;
        break;
        case '/': result = val1/val2;
        break;
        case 'square': result = val1*val1;
        break;
        case 'root': result = Math.sqrt(val1);
    }
    return +result.toPrecision(4);
}