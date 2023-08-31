

function dropTask(a){
    if (a.classList.contains("rotate-ic")){
        a.classList.remove("rotate-ic");
        a.parentNode.parentNode.parentNode.children[1].classList.remove("show-subtask");
    }else{
        a.classList.add("rotate-ic");
        a.parentNode.parentNode.parentNode.children[1].classList.add("show-subtask");
    }
    
}

const form = document.getElementById("taskForm");
function addTask(e){
    e.preventDefault();
    alert(this.taskid.value);
}

function Close(a){
    a.style.display = "none";
}
form.addEventListener("submit", addTask);