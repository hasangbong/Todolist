const body = document.querySelector("body"); // html 문서에서 작업할 body전체를 불러온다.

const IMG_NUMBER = 4; //random에 사용할 변수


function paintImage(imgNumber){//randomNumber롤 받아 그 숫자 .jpg파일을 배경에 뛰움
    const image = new Image();//생성자 Image(): HTMLImageElement인스턴스-기능적으로 document.createElement('img')역활
    image.src = `images/${imgNumber + 1}.jpg`;//images 폴더에서 randomNumber에 1을 더한 수 이름의 .jpg 를 불러옴
    image.classList.add("bgImage");//bgImage를 classlist에 더함
    body.appendChild(image);//body요소끝에 image요소를 붙인다
}

function genRandom(){ // math.random 함수로 균일한(approximately uniform) 부동소숫점 의사난수를 반환받아 범위 변환후(수를 곱함) 버림(floor)으로 정수로 return
    const number = Math.floor(Math.random()*IMG_NUMBER)
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();// 시작하면 genRandom 함수의 return값을 변수에 저장고 변수를 paintImage 함수에 넘긴다. 