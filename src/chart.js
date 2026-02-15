// 🔥 Firebase Imports
import { auth, database, onAuthStateChanged } from "./firebase.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        render(); // Load progress after login
    } else {
        window.location.href = "login_page.html"; // redirect if not logged in
    }
});

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { 
//   getDatabase, 
//   ref, 
//   set, 
//   get 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// 🔥 Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyC7QanMxCuZrxjP1kQ40N2NRe2nD1Vsefo",
//     authDomain: "nextyou1-f174f.firebaseapp.com",
//     databaseURL: "https://nextyou1-f174f-default-rtdb.firebaseio.com",
//     projectId: "nextyou1-f174f",
//     storageBucket: "nextyou1-f174f.firebasestorage.app",
//     messagingSenderId: "891347710844",
//     appId: "1:891347710844:web:b181bb2f18089fe8ce2af9"
// };
// const firebaseConfig = { apiKey: "AIzaSyC7QanMxCuZrxjP1kQ40N2NRe2nD1Vsefo", authDomain: "nextyou1-f174f.firebaseapp.com", databaseURL: "https://nextyou1-f174f-default-rtdb.firebaseio.com", projectId: "nextyou1-f174f", storageBucket: "nextyou1-f174f.firebasestorage.app", messagingSenderId: "891347710844", appId: "1:891347710844:web:b181bb2f18089fe8ce2af9" };
// // 🔥 Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// 🔥 TEMP USER (Later replace with auth UID)
//const userId = "demoUser";

// DOM Elements
const monthSelect = document.getElementById("monthSelect");
const calendar = document.getElementById("calendar");
const percentageText = document.getElementById("percentageText");
const ring = document.querySelector(".progress");

const months = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

// Populate dropdown
months.forEach((m,i)=>{
    const option=document.createElement("option");
    option.value=i;
    option.textContent=m;
    monthSelect.appendChild(option);
});

monthSelect.value = new Date().getMonth();

// Get number of days
function getDaysInMonth(month){
    return new Date(2024, month+1, 0).getDate();
}

// 🔥 Load Data from Firebase
async function getData(month){

    if (!currentUser) return [];

    const snapshot = await get(
        ref(database, `users/${currentUser.uid}/progress/${month}`)
    );

    if(snapshot.exists()){
        return snapshot.val();
    } else {
        return new Array(getDaysInMonth(month)).fill(0);
    }
}


function saveData(month,data){
    set(
        ref(database, `users/${currentUser.uid}/progress/${month}`),
        data
    );
}

let chart;

// 🔥 Main Render Function
async function render(){
    if (!currentUser) {
        console.log("User not ready yet");
        return;
    }
    const month = parseInt(monthSelect.value);
    const days = getDaysInMonth(month);
    let data = await getData(month);

    calendar.innerHTML="";

    for(let i=0;i<days;i++){
        const day=document.createElement("div");
        day.classList.add("day");
        day.textContent=i+1;

        if(data[i]===1) day.classList.add("completed");
        if(data[i]===-1) day.classList.add("missed");

        day.onclick=async ()=>{
            if(data[i]===1) data[i]=-1;
            else data[i]=1;

            saveData(month,data);
            render();
        }

        calendar.appendChild(day);
    }

    updateGraph(data);
    updateCircle(data);
}

// 🔥 Update Chart
function updateGraph(data){
    const ctx=document.getElementById("progressChart");

    const cumulative = data.map((_,i)=>
        data.slice(0,i+1).filter(v=>v===1).length
    );

    if(chart) chart.destroy();

    chart=new Chart(ctx,{
        type:"line",
        data:{
            labels:data.map((_,i)=>i+1),
            datasets:[{
                label:"Completed Days",
                data:cumulative,
                borderColor:"#1b8f5a",
                backgroundColor:"rgba(27,143,90,0.1)",
                fill:true,
                tension:0.4
            }]
        },
        options:{
            responsive:true,
            plugins:{ legend:{display:false} }
        }
    });
}

// 🔥 Update Percentage Circle
function updateCircle(data){
    const completed=data.filter(v=>v===1).length;
    const percentage=Math.round((completed/data.length)*100);

    percentageText.textContent=percentage+"%";

    const offset=471 - (471*percentage)/100;
    ring.style.strokeDashoffset=offset;
}

monthSelect.onchange=render;

// Initial load
// render();
