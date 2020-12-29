const form = document.querySelector(".js-form");
const resultScreen = document.querySelector(".main-result");

let valueArray = [];

let stack = [];
let convert = [];
let temp = ""; // 두자리수 이상의 숫자를 저장할 임시변수

// 우선순위를 반환하는 함수
function prec(op) {
    switch(op) {
        case '(':
        case ')':
            return 0;
        case '+':
        case '-':
            return 1;
        case '×':
        case '/':
            return 2;    
        }
        return 999;
}



function resultBtn(){
    const f = resultScreen.textContent;

    for(let i = 0; i<f.length; i++) {
        const char = f.charAt(i);
        
        switch(char) {
            case '(' :
                stack.push(char);
                break;

            case '+' : case '-' : case '×' : case '/' :
                while(stack[stack.length - 1] != null &&
                    prec(char) <= prec(stack[stack.length - 1]) ){
                        convert.push(stack.pop());
                } 
                stack.push(char);
                break;

            case ')' :
                let returned_op = stack.pop();
                while(returned_op != '('){
                    temp += returned_op;
                    returned_op = stack.pop();

                    if(isNaN(stack[stack.length - 1])){
                        convert.push(temp);
                        temp = "";
                    }
                } 
                break;
                            
            default :
                temp += char; // isNaN(f.charAt(i+1)) : 다음에 연산자가 나오면
                if(isNaN(f.charAt(i+1)) || ( (i+1) == f.length )){
                    convert.push(temp);
                    temp="";
                }
                break;
        }
        
    }
    
    while(stack[stack.length - 1] != null){
        convert.push(stack.pop());
    }

    let result = "";
    for(let i in convert){
        result += convert[i];
        result += " ";
    }

    console.log(result); //후위표기식

}





function initBtn(){
    valueArray = [];
    convert = [];
    stack = [];
    temp = "";
    paintValue();
}

function delBtn(){
    valueArray.length = valueArray.length - 1;
    paintValue();
}

function paintValue() {
    var value = "";
    for(var i=0; i<valueArray.length; i++){
        value = value + valueArray[i];
    }
    resultScreen.innerText = value;
}

function saveBtn(value) {
    valueArray.push(value);
    paintValue();
}

function clickedBtn(event) {
    const btn = event.target;
    let btnValue = btn.value;

    if(btn.id < 30) {
        saveBtn(btnValue);
    } else if(btn.id =="31") {
        delBtn(btnValue);
    } else if(btn.id =="32") {
        initBtn(btnValue);
    } else if(btn.id =="33") {
        resultBtn(btnValue);
    }
    
}

function init() {
    form.addEventListener('click', clickedBtn);
}

init();

