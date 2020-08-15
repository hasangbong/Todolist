const weather = document.querySelector(".js-weather"); //html 문서에서 날씨를 표시할 부분 class 를 불러옴

const API_KEY = '909ae6179af6e0955672dd89b88760a9'; //https://openweathermap.org/ 에서 받아옴
const COORDS = 'coords'; // 좌표 저장 key 값

function getWeather(lat,lon){// 위도와 경도를 받아서 api가 재공하는 날씨정보와 지명이름을 불러온다.
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric` //https://api.openweathermap.org에 경도,위도 정보를 보냄
    ).then(function(response){ //then으로 응답을 기다렸다 응답의 JSON포멧파일을 돌려준다.
        return response.json();
    }).then(function(json){//then으로 응답을 기달렷다가 받은 JSON파일에 있는 온도데이터와 장소이름을 변수에 각각 저장하고 화면에 표시한다. 
       const temperature = json.main.temp;
       const place = json.name;
       weather.innerText =`${temperature} @  ${place}`;// html에 표시
    });
}

function saveCoords(coordsObj){ // 객체값을 받아서 localStorage에 key이름과 함께 string으로 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){ // 현재 위치 불러오기를 성공했을때 위도와 경도를 coordsObj 객체로 저장 하고 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj); //savecoords 함수에 객체를 넘김
    getWeather(latitude, longitude);//getWeatger 함수에 경도, 위도 넘김
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){ // navigator 객체가 가지고 있는 geologation.getCurrentPosition 메서드를 이용해서 장치의 현재 위치를 불러온다.
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){// 저장된 좌표가 없으면 askForcoords를 실행, 있으면  gerweather함수에 넘김 
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();//시작시 실행 losdCoords 함수 불러옴


