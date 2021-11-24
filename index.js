const habitsHTML = document.getElementById("habits")
const btn = document.getElementById("addHabit");
const text = document.getElementById("input")
var habits;

btn.addEventListener("click",()=>{
    
    habits.push(text.value);
    text.value="";
    setHabit();
    render();
})
localStorage.getItem("habit")?habits=JSON.parse(localStorage.getItem("habit")):habits=[];
const setHabit=()=>{localStorage.setItem("habit",JSON.stringify(habits))}


const render=()=>{
    if(habits.length>0){
        let string="";
        console.log(habits);
        habits.forEach((habit)=>{
            string+=`<div class="habit"><p>${habit}</p></div>`
        });
        habitsHTML.innerHTML=string;
    }else{
        habitsHTML.innerHTML=`<p>No habits yet </p>`
    }
}
setHabit();
render();

