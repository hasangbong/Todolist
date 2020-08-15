const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"); // html 문서에서 작업할 부분 (사용자 입력) 불러옴

const USER_LS = "currentUser",// 저장될 key 값
    SHOWING_CN = "showing" // class 이름

function saveName(text){ //localStorage에 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){// 발생한 이벤트를 받아서 paintGreeting 함수와 saveNamee 함수에 넘겨줌
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){ // 사용자 이름 입력란을 화면에 표시
    form.classList.add(SHOWING_CN); //class 이름을 넣어줌
    form.addEventListener("submit",handleSubmit); // 이벤트 발생시 함수 실행
} 

function paintGreeting(text){ // text 파일을 받아서 인사화 함께 화면에 표시
        form.classList.remove(SHOWING_CN);// Text 입력란의 class 이름을 지워서 입력란을 숨김
    greeting.classList.add(SHOWING_CN); // class 이름을 넣어서 인사 와 함께 사용자 이름 표시 할수 있게 함
    greeting.innerText = `hello ${text}`; // 표시
}

function loadName(){ // localStorage에 저장된 값이 없으면 askForName 실행, 있으면 paintGreeting 실행
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else{
       paintGreeting(currentUser);  
    }
}
function init(){
    loadName();
}
init(); //웹페이지 실행시 loadName 실행