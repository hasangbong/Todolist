const clockContainer = document.querySelector(".js-clock"); //html 문서에서 class 및 태그를 불러와 작업 시작
const clockTitle = document.querySelector("h1");

function getTime(){ 
    const date = new Date(); // 현제 날짜 및 시간을 저장
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds(); //시간 분 초 나눔
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes 
        < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` 
        : seconds}`; // 화면에 표시
}

function init(){
    getTime();
    setInterval(getTime,1000);
}
init(); //시간 표시 함수 실행, 1초마다 재실행


