

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
const formContainer = document.getElementById("form");

function addTask(e){
    e.preventDefault();
    //this.parentNode.style.display = "none";

    const taskId = this.taskid.value;
    const taskTopic = this.tasktopic.value;


    var today = new Date();
    var startDate = new Date(this.startdate.value);
    console.log(startDate,today);
    var endDate = new Date(this.enddate.value);


    //console.log(taskId,taskTopic,startDate,startDate);

    if(taskId != "" && taskTopic != "" && startDate != "Invalid Date" && endDate != "Invalid Date"){
        if(today <= startDate){
            document.getElementById("invalidSdate").innerText =  "";
            if(startDate < endDate){
                document.getElementById("invalidEdate").innerText = "";
            }else{
                document.getElementById("invalidEdate").innerText = startDate > endDate ? "Please Enter Larger Date From Start Date" : "";
            }
        }else{
            console.log("Lessser Date");
            document.getElementById("invalidSdate").innerText = "Please Enter Date Larger Or Equal To today!";
        }
        document.getElementById("invalidId").innerText = taskId == "" ?  "Please Enter Valid Task Id": "";
        document.getElementById("invalidTopic").innerText = taskTopic == "" ? "Please Enter Valid Topic" : "";
    }else{

        if(startDate == "Invalid Date"){
            document.getElementById("invalidSdate").innerText = "Please Enter Valid Start Date";
        }else if(startDate < today){
            document.getElementById("invalidSdate").innerText = "Please Enter Larger Date From Today";
        }
        if(endDate == "Invalid Date"){
            document.getElementById("invalidEdate").innerText = "Please Enter Valid End Date";
        }else if(startDate < endDate){
            document.getElementById("invalidEdate").innerText = "Please Enter Larger Date From Start Date";
        }
    }
    


    
}

function Close(a){
    a.style.display = "none";
}

function submitTask(){
    formContainer.style.display = "block";
}

form.addEventListener("submit", addTask);

{/* <div class="task">
            <div class="flex parent-task">
                <p class="task-id">100</p>
                <p class="task-name"> <i onclick="dropTask(this)" class="ic"></i>Clean home</p>
                <p class="start-date">31/08/2023</p>
                <p class="end-date">01/09/2023</p>
                <p class="status">Open</p>
                <p class="action"></p>
            </div>
            </div> */}