var track;
const trackHTML = document.getElementById("track");
var Day = new Date();
var currentDate = Day.getMinutes();
var habits;
var currentHabits;
var buttons;
localStorage.getItem("track")?track=JSON.parse(localStorage.getItem("track")):track=[0];
const setDate=()=>{localStorage.setItem("track",JSON.stringify(track))}

localStorage.getItem("habit")?habits=JSON.parse(localStorage.getItem("habit")):habits=[];



if(localStorage.getItem("currentDate")){
    if(currentDate!=JSON.parse(localStorage.getItem("currentDate"))){
        track.push(0);
        localStorage.setItem("currentDate",JSON.parse(currentDate));
        localStorage.setItem("track",JSON.stringify(track));
        localStorage.removeItem("currentHabit");
    }
}else{
    localStorage.setItem("currentDate",JSON.stringify(currentDate));
}



if(localStorage.getItem("currentHabit")){
    currentHabits = JSON.parse(localStorage.getItem("currentHabit"));
   }else{
       localStorage.setItem("currentHabit",JSON.stringify(habits))
       localStorage.setItem("habitLength",JSON.stringify(habits.length));
       currentHabits = JSON.parse(localStorage.getItem("currentHabit"));
   }


if(localStorage.getItem("habitLength")){
    let lengths = JSON.parse(localStorage.getItem("habitLength"));
    if(lengths!=habits.length){
        for(i=habits.length-1;i>lengths-1;i--)
        currentHabits.push(habits[i]);
    }
    localStorage.setItem("habitLength",JSON.stringify(habits.length));
    localStorage.setItem("currentHabit",JSON.stringify(currentHabits));
}else{
    localStorage.setItem("habitLength",JSON.stringify(habits.length))
}

const renderTrack=()=>{
    let string="";
    track.forEach((el)=>{
        let Style;


        switch(el){
            case 0: Style="";break;
            case 1: Style="light";break;
            case 2: Style="med";break;
            case 3: Style="dark";break;
        }
        string+=`<div class="box ${Style}"></div>`
    })
    trackHTML.innerHTML=string;
}
renderTrack();


const habitsHTML = document.getElementById("s-habits")



const render=()=>{
    if(currentHabits.length>0){
        let string="";
        console.log(currentHabits);
        currentHabits.forEach((habit,i)=>{
            string+=`<div class="habit"><p>${habit}</p><button class="btn" name=${i}>&#10004;</button></div>`
        });
        habitsHTML.innerHTML=string;
    }else{
        habitsHTML.innerHTML=`<p>Done All Tasks! </p>`
    }
    if(!habits.length>0){
        habitsHTML.innerHTML=`<p>No Tasks Yet </p>`
    }
    buttons = document.querySelectorAll(".btn");
    buttons.forEach((button)=>{
        button.addEventListener("click",()=>{
            currentHabits.splice(button.name,1);
            if(habits.length-currentHabits.length<Math.round(currentHabits.length/2)){
                track[track.length-1]=1;
            }else if(habits.length-currentHabits.length==Math.round(currentHabits.length/2)){
                track[track.length-1]=2
            }
            else if(habits.length-currentHabits.length>Math.round(currentHabits.length/2)){
                track[track.length-1]=3;
            }          
            localStorage.setItem("track",JSON.stringify(track));
            renderTrack();
            localStorage.setItem("currentHabit",JSON.stringify(currentHabits))
            render();
        })
    })
}

render();