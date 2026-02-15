// const monthSelect = document.getElementById("monthSelect");
// const calendar = document.getElementById("calendar");
// const percentageText = document.getElementById("percentageText");
// const ring = document.querySelector(".progress");

// const months = [
// "January","February","March","April","May","June",
// "July","August","September","October","November","December"
// ];

// months.forEach((m,i)=>{
//     const option=document.createElement("option");
//     option.value=i;
//     option.textContent=m;
//     monthSelect.appendChild(option);
// });

// monthSelect.value = new Date().getMonth();

// function getDaysInMonth(month){
//     return new Date(2024, month+1, 0).getDate();
// }

// function getData(month){
//     return JSON.parse(localStorage.getItem("month-"+month)) || 
//            new Array(getDaysInMonth(month)).fill(0);
// }

// function saveData(month,data){
//     localStorage.setItem("month-"+month, JSON.stringify(data));
// }

// let chart;

// function render(){
//     const month = parseInt(monthSelect.value);
//     const days = getDaysInMonth(month);
//     let data = getData(month);

//     calendar.innerHTML="";

//     for(let i=0;i<days;i++){
//         const day=document.createElement("div");
//         day.classList.add("day");
//         day.textContent=i+1;

//         if(data[i]===1) day.classList.add("completed");
//         if(data[i]===-1) day.classList.add("missed");

//         day.onclick=()=>{
//             if(data[i]===1) data[i]=-1;
//             else data[i]=1;
//             saveData(month,data);
//             render();
//         }

//         calendar.appendChild(day);
//     }

//     updateGraph(data);
//     updateCircle(data);
// }

// function updateGraph(data){
//     const ctx=document.getElementById("progressChart");

//     const cumulative = data.map((_,i)=>
//         data.slice(0,i+1).filter(v=>v===1).length
//     );

//     if(chart) chart.destroy();

//     chart=new Chart(ctx,{
//         type:"line",
//         data:{
//             labels:data.map((_,i)=>i+1),
//             datasets:[{
//                 label:"Completed Days",
//                 data:cumulative,
//                 borderColor:"#1b8f5a",
//                 backgroundColor:"rgba(27,143,90,0.1)",
//                 fill:true,
//                 tension:0.4
//             }]
//         },
//         options:{
//             responsive:true,
//             plugins:{ legend:{display:false} }
//         }
//     });
// }

// function updateCircle(data){
//     const completed=data.filter(v=>v===1).length;
//     const percentage=Math.round((completed/data.length)*100);

//     percentageText.textContent=percentage+"%";

//     const offset=471 - (471*percentage)/100;
//     ring.style.strokeDashoffset=offset;
// }

// monthSelect.onchange=render;

// render();
