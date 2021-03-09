// 컨버스를 id를 통해 가져옴
const canvas = document.getElementById("jsCanvas");
//캔버스 html이 같는 성능 중 getContext 기능 활용 
const ctx = canvas.getContext("2d");
//색 선택
const colors= document.getElementsByClassName("js-color");
//팬크기
const range= document.getElementById("jsrange")

//캔버스 크기를 지정해줘야 실행됨
canvas.width = 700;
canvas.height = 700;


//stroke 색상
ctx.strokeStyle = "2c2c2c";
ctx.lineWidth = 2.5; //라인의 크기 

// 기본적으로 페인팅 값은 false로 설정
let painting= false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); //path는 선을 생성
        ctx.moveTo(x,y); //path를 좌표에 따라 움직여 놓음
    } else{
        ctx.lineTo(x,y); // path의 시작점과 끝을 직선으로 그림
        ctx.stroke(); //현재 path 값에 strokestyle에 설정된 값으로 채움(그리는 것)
}}

function startPainting(event){
    painting=true;
}

function StopPainting(event){
    painting = false;
}

function onMouseDown(event){
    console.log(event);
    painting =true;  //캔버스 위 마우스를 클릭 하였을 때는 트루
}

function changeColor(event){
    const color = event.target.style.backgroundColor; //클릭된 객체의 스타일을 타겟으로 불러와서 그 중 백그라운드 컬러를 상수로 만든다
    ctx.strokeStyle = color; // strokestyle로 오버라이드 해주면 변한다
}

function handleRangeChange(event){
    const raange = event.target.value;
    ctx.lineWidth = raange;
}

// 마우스무브라는 이벤트가 발생하면 onMouseMove 함수를 실행하도록 설정
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    // 마우스다운(클릭)라는 이벤트가 발생하면 onMouseMove 함수를 실행하도록 설정
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", StopPainting);
    canvas.addEventListener("mouseleave", StopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
    range.addEventListener("input", handleRangeChange);
}