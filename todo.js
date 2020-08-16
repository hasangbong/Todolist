const toDoForm = document.querySelector(".js-toDoForm"), // html 문서에서 할일 입력 class 불러오기
    toDoInput = toDoForm.querySelector("input"),  
    toDoList = document.querySelector(".js-toDoList"); // 할일 표시 class


const TODOS_LS = 'toDos';    //key 이름

const LINE_TH ='lineThrough'

let toDos = [];


function finishToDo(event){ // checkbox 이벤트를 받아서 부모를 찾아서 class name을 넣어준다.
    const chk = event.target;
    const li = chk.parentNode;
    const chId = li.id;
    if(this.checked){
        li.classList.add(LINE_TH);
        localStorage.setItem(chId, JSON.stringify(this.checked));
    }else{
        li.classList.remove(LINE_TH);
        window.localStorage.removeItem(chId);
    }
}


function deleteToDo(event){ //할일 삭제
    const btn = event.target; // 지울 타겟 설정
    const li = btn.parentNode; // 이벤트가 실행된 btn 찾음
    toDoList.removeChild(li); //할일란에서 li 를 지움
    const cleanToDos = toDos.filter(function(toDo){ //필터를 이용해 todoo.id 와 li.id가 다르면 살리고 같으면 버린다.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; // 살아 남은 값들을  toDos 배열에 덥는다.
    console.log(toDos);
    saveToDos(); // 변경된값을 localSorage 에 저장
}



function saveToDos(){
   localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //입력된 이벤트를 string으로 변형후 저장
}


function paintToDo(text){ //localStorage에 저장된 text 및 이벤트 입력란으로 들어오는 값을 할일란에 표시한다.
    const newId = toDos.length + 1; //id 설정
    const li = document.createElement("li"); //html 태그 생성
    const delBtn = document.createElement("input");
    delBtn.type = "button";
    delBtn.value = "Del";
    delBtn.style.height = "20px"
    delBtn.addEventListener("click", deleteToDo); // 할일 지움
    const span = document.createElement("span");
    const chbx = document.createElement("input")
    chbx.type = "checkbox";
    chbx.classList.add(newId);
    chbx.addEventListener("change", finishToDo);
    span.innerText = text;
    li.appendChild(chbx);
    li.appendChild(span);
    li.appendChild(delBtn); //li에 종속 시킴
    li.id = newId;
    toDoList.appendChild(li); 
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);//행렬에 객체를 더함
    const checked = JSON.parse(localStorage.getItem(li.id));
    chbx.checked = checked;
    if(chbx.checked){
        li.classList.add(LINE_TH);
    }else{
        li.classList.remove(LINE_TH);
    }
}    

function handleSubmit(event){ // 할일란에 입력되는 event를 받아서 할일란에 쓴다. (paintToDo 함수 실행)
   event.preventDefault();
   const currentValue = toDoInput.value;
   paintToDo(currentValue);
   toDoInput.value = "";
   saveToDos(); //입력된 event 저장을 위해 saveToDos 함수 실행
}


function loadToDos(){ //localStorage에 저장된 데이터가 있다면 text값을 개별로 불러와서 할일란에 쓴다.(paintToDo 함수 실행)
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init(); //웹페이지가 켜지면 loadToDos함수를 실행 , 할일 입력란에 이벤트 발생시 handleSubmit 함수실행

