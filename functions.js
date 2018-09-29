


document.addEventListener('keydown', pressedKey);
var screen = document.getElementById('screen');

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
        default://Do nothing
        break;
    }
}

function appendScreen(screen, val) {
    if(screen.value.length <=11) {
        screen.value = screen.value + val;
    }
}

function clearScreen(screen) {
    screen.value = '';
}

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
        }
        result = replaceDotComma(result.toString());

        // Print result
        appendScreen(screen, '=' + result);
    } else {
        screen.value = 'No valid input';
    }
    

}

function checkInput(input) {
    var pattern = new RegExp("([0-9]+[\\+\\-\\*\\/]{1}[0-9]+)+([\\+\\-\\*\\/]{1}[0-9]+)*");
    if(pattern.test(input)) {
        return true;
    } else {
        return false;
    }
}

function cleanInput(input) {
    input = input.replace('×', '*');
    input = input.replace('÷', '/');
    input = input.replace(/,/g, '.');
    return input;
}

function replaceDotComma(input) {
    input = input.replace('.', ',');
    return input;
}

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
    }

    return result.toPrecision(4);
}

