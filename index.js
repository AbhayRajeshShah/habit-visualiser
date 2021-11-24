const habitsHTML = document.getElementById("habits")
const btn = document.getElementById("addHabit");
const text = document.getElementById("input")
var habits;
var buttons;

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
        habits.forEach((habit,i)=>{
            string+=`<div class="habit"><p>${habit}</p><button class="x" name=${i}>X</button></div>`
        });
        habitsHTML.innerHTML=string;
    }else{
        habitsHTML.innerHTML=`<div class="center"><p>No habits yet </p></div>`
    }
    buttons = document.querySelectorAll(".x");
    buttons.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            let index;
            if(localStorage.getItem("currentHabit")){
               let current =  JSON.parse(localStorage.getItem("currentHabit"));
               current.forEach((el,i)=>{
                   if(el==habits[btn.name]){
                    index=i;
                   }
               })
               current.splice(index,1);
               localStorage.setItem("currentHabit",JSON.stringify(current));
            }
            habits.splice(btn.name,1);
            setHabit();
            render();
        })
    })
}
setHabit();
render();

