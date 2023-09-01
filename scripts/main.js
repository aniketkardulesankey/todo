var taskArray = [];

const alphabetArray = ["A","B","C","D","E","F","G","H","I","J","K"];

const invId = document.getElementById("invalidId");


function dropTask(a){
    if (a.classList.contains("rotate-ic")){
        a.classList.remove("rotate-ic");
        a.parentNode.parentNode.parentNode.children[1].classList.remove("show-subtask");
    }else{
        a.classList.add("rotate-ic");
        a.parentNode.parentNode.parentNode.children[1].classList.add("show-subtask");
    }
    
}
function findId(value){
    const val = parseInt(value.value);
    const foundId = taskArray.find(obj => obj.task_id === val);
    if(!foundId){
        invId.innerText = "";
    }else{
        invId.innerText = "Task With Id "+ val +" Already Exists";
    }
}


const form = document.getElementById("taskForm");
const subTaskForm = document.getElementById("taskForm2");
const formContainer = document.getElementById("form");
const formContainer2 = document.getElementById("form2");


const invstartDate = document.getElementById("invalidSdate");
const invendDate = document.getElementById("invalidEdate");
const invTopic = document.getElementById("invalidTopic");
    

function addTask(e){
    e.preventDefault();

    const taskId = this.taskid.value;
    const taskTopic = this.tasktopic.value;


    var today = new Date();
    var startDate = new Date(this.startdate.value);
    var endDate = new Date(this.enddate.value);


    

    if(taskId != "" && taskTopic != "" && startDate != "Invalid Date" || endDate != "Invalid Date"){
        if(today >= startDate){
            invstartDate.innerText = "Please Enter Date Larger Or Equal To today!";
        }else{

            invstartDate.innerText =  "";
            if(startDate <= endDate){
                invendDate.innerText = "";
                const obje = {
                    task_id:parseInt(taskId),
                    id_status:"not_updated",
                    topic:taskTopic,
                    start_date:startDate,
                    end_date:endDate,
                    status:"open",
                    sub_tasks:[]
                }
                createTask(obje);
                displayTask(obje);
                this.reset();
                this.parentNode.style.display = "none";
            }else{
                invendDate.innerText = "Please Enter Larger Date From Start Date";
            }
        }
        
        
    }else{

        invstartDate.innerText = startDate == "Invalid Date" ? "Please Enter Valid Start Date" : "";
        invendDate.innerText = endDate == "Invalid Date" ? "Please Enter Valid End Date" : "";
        invTopic.innerText = taskTopic == ""? "Please Enter Valid Topic!" : "";
        invId.innerText = taskId == ""? "Please Enter Valid Task Id!":"";
    }
    


    
}

function Close(a){
    a.style.display = "none";
}

function submitTask(){
    formContainer.style.display = "block";
    form.addEventListener("submit", addTask);
}



function createTask(obje){
    const foundId = taskArray.find(obj => obj.taskid === obje.task_id);
    if(!foundId){
        taskArray.push(obje);
    }
    console.log(taskArray);
}

const wrapper = document.querySelector(".wrapper");
function displayTask(obje){
    var sDate = obje.start_date.toLocaleDateString();
    var eDatec = obje.end_date.toLocaleDateString();

    const newCreatedTask = `
                            <div id='${obje.task_id}-task' class="task">
                                <div class="flex parent-task">
                                    <p class="task-id">${obje.task_id}</p>
                                    <p class="task-name"> <i onclick="dropTask(this)" class="ic ic-arrow"></i><span>${obje.topic}</span></p>
                                    <p class="start-date">${sDate}</p>
                                    <p class="end-date">${eDatec}</p>
                                    <p class="status">${obje.status}</p>
                                    <p class="action"><i onclick="updateTask(${obje.task_id},this)" class="ic ic-edit"></i><i onclick="deleteTask(${obje.task_id})" class="ic ic-delete"></i></p>
                                </div>
                                <div class="sub-tasks">
                                    <div class="flex">
                                        <p class="task-id"></p>
                                        <p class="task-name" onclick="addSubTask(${obje.task_id})"><span class="sc-title addnew">Add New +</span></p>
                                        <p class="start-date"></p>
                                        <p class="end-date"></p>
                                        <p class="status"></p>
                                        <p class="action"></p>
                                    </div>
                                </div>
                            </div>`

        wrapper.insertAdjacentHTML("beforeend", newCreatedTask);
}


const taskId = document.getElementById("taskid2");
function addSubTask(a){
    formContainer2.style.display = "block";
    taskId.value = a;
    taskId.disabled = true;
}



function createSubTask(e){
    e.preventDefault();
    
    const parentId = parseInt(this.taskid2.value);
    const foundId = taskArray.find(obj => obj.task_id === parentId);
    console.log(foundId);

    const parStartDate = foundId.start_date;
    const parEndDate = foundId.end_date;
    const subStartDate = new Date(this.startdate2.value);
    const subEndDate = new Date(this.enddate2.value);
    const subTopic = this.tasktopic2.value;
    const invStartDate = document.getElementById("invalidSdate2");
    const invEndDate = document.getElementById("invalidEdate2");

    

    if(subStartDate < parStartDate || subEndDate > parEndDate || subStartDate == "Invalid Date" || subEndDate == "Invalid Date"){

        if(subStartDate != "Invalid Date"){
            invStartDate.innerText = "";
            if(subStartDate < parStartDate){
                invStartDate.innerText = "Please Enter Larger Date From Parent Start Date!";
            }
        }else{
            invStartDate.innerText = "Please Enter Valid Start Date!";
        }

        if(subEndDate != "Invalid Date"){
            invEndDate.innerText = "";
            if(subEndDate > parEndDate){
                invEndDate.innerText = "Please Enter Smaller Date From Parent End Date!";
            }
        }else{
            invEndDate.innerText = "Please Enter Valid End Date!";
        }

    }else{
        invStartDate.innerText = "";
        invEndDate.innerText = "";
        
        var setSubId = "";
        for(let i= 0; i < alphabetArray.length; i++){
            const foundSubId = foundId.sub_tasks.find(obj => obj.task_id === parentId+alphabetArray[i]);
            if(!foundSubId){
                setSubId = parentId+alphabetArray[i];
                break;
            }
        }

        console.log(subStartDate,subEndDate);
        const subObject = {
            task_id:setSubId,
            id_status:"not_updated",
            title:subTopic,
            start_date:subStartDate,
            end_date:subEndDate,
            status:"open"

        }

        var objIndex = taskArray.findIndex((obj => obj.task_id == parentId));
        taskArray[objIndex].sub_tasks.push(subObject);

        displaySubTask(parentId,subObject);

        this.reset();
        Close(this.parentNode);
        
        }
    }



function displaySubTask(id, ob){
    const taskObje = document.getElementById(id+"-task");
    
    const subTaskInsert = taskObje.children[1].lastElementChild;

    const subTaskString = `
                            <div class="flex sub-task">
                                <p class="task-id">${ob.task_id}</p>
                                <p class="task-name"><span class="sc-title">${ob.title}</span></p>
                                <p class="start-date">${new Date(ob.start_date).toLocaleDateString()}</p>
                                <p class="end-date">${new Date(ob.end_date).toLocaleDateString()}</p>
                                <p class="status">${ob.status}</p>
                                <p class="action"><i class="ic ic-edit"></i><i class="ic ic-delete"></i></p>
                            </div>`
                            subTaskInsert.insertAdjacentHTML('beforebegin', subTaskString);

}



subTaskForm.addEventListener("submit",createSubTask);

function deleteTask(id){
    var objIndex = taskArray.findIndex((obj => obj.task_id == parseInt(id)));
        taskArray[objIndex].id_status = "deleted";

    Close(document.getElementById(id+"-task"));
}

function updateTask(id,th){
    const updateTaskContainer = document.getElementById("updateTask");
    updateTaskContainer.style.display = "block";
    var objIndex = taskArray.findIndex((obj => obj.task_id == parseInt(id)));
    const foundId = taskArray.find(obj => obj.task_id === parseInt(id));
    const updateTaskId = document.getElementById("updateTaskId");
    const updateTaskTopic = document.getElementById("updateTaskTopic");
    const updateStartDate = document.getElementById("updateStartDate");
    const updateEndDate = document.getElementById("updateEndDate");
    const status = document.getElementById("status");

    updateTaskId.value = foundId.task_id
    updateTaskTopic.value = foundId.topic;
    updateStartDate.value = datetimeLocal(foundId.start_date);
    updateEndDate.value = datetimeLocal(foundId.end_date);
    const updateTaskButoon = document.getElementById("updateTaskButoon");
    updateTaskButoon.onclick = (e)=>{
        e.preventDefault();


        taskArray[objIndex].task_id = updateTaskId.value;
        taskArray[objIndex].start_date = updateStartDate.value
        taskArray[objIndex].topic = updateTaskTopic.value;
        taskArray[objIndex].end_date = updateEndDate.value
        taskArray[objIndex].status = updateTaskId.value;
        
        Close(updateTaskContainer);

        const elements = th.parentNode.parentNode.children;

        console.log(elements);
        elements[0].innerText = updateTaskId.value;
        elements[2].innerText = updateStartDate.value;
        elements[1].children[1].innerText = updateTaskTopic.value;
        elements[3].innerText = updateEndDate.value;
        elements[4].innerText = status.value;
        alert("Task Updated!")
    }

    

}

function datetimeLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
}

{/* <div class="flex parent-task">
                                    <p class="task-id">${obje.task_id}</p>
                                    <p class="task-name"> <i onclick="dropTask(this)" class="ic ic-arrow"></i>${obje.topic}</p>
                                    <p class="start-date">${sDate}</p>
                                    <p class="end-date">${eDatec}</p>
                                    <p class="status">${obje.status}</p>
                                    <p class="action"><i onclick="updateTask(${obje.task_id},this)" class="ic ic-edit"></i><i onclick="deleteTask(${obje.task_id})" class="ic ic-delete"></i></p>
                                </div> */}



const updateTaskForm = document.getElementById("updateTaskForm");

updateTaskForm.addEventListener("submit",updateTask);


function searchTasks(inpu){
    
}

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click",function(){

    
    const input = searchInput.value;
    let filteredData= taskArray.filter(value => {
        const ifId = parseInt(value.task_id);
        return (
          (value.topic.toLowerCase().includes(input.toLowerCase())  ||
          value.start_date.toLowerCase().includes(input.toLowerCase())  ||
          value.end_date.toLowerCase().includes(input.toLowerCase())  ||
          ifId == parseInt(input) ) &&
          value.id_status != "deleted"
        );
      });
      console.log(filteredData)

      var string = "";

for(let i = 0; i < filteredData.length; i++){





    string += `
       
            <div id='${filteredData[i].task_id}-task' class="task">
                <div class="flex parent-task">
                    <p class="task-id">${filteredData[i].task_id}</p>
                    <p class="task-name"> <i onclick="dropTask(this)" class="ic ic-arrow"></i>${filteredData[i].topic}</p>
                    <p class="start-date">${filteredData[i].start_date}</p>
                    <p class="end-date">${filteredData[i].end_date}</p>
                    <p class="status">${filteredData[i].status}</p>
                    <p class="action"><i onclick="updateTask(${filteredData[i].task_id},this)" class="ic ic-edit"></i><i onclick="deleteTask(${filteredData[i].task_id})" class="ic ic-delete"></i></p>
            </div>
    
    `

    string += `<div class="sub-tasks">`;
    if(filteredData[i].sub_tasks.length >= 1){
       
        for(let j = 0; j < filteredData[i].sub_tasks.length; j++){

            string += `<div class="flex sub-task">
                            <p class="task-id">${filteredData[i].sub_tasks[j].task_id}</p>
                            <p class="task-name"><span class="sc-title">${filteredData[i].sub_tasks[j].task_id}</span></p>
                            <p class="start-date">${filteredData[i].sub_tasks[j].task_id}</p>
                            <p class="end-date">${filteredData[i].sub_tasks[j].task_id}</p>
                            <p class="status">${filteredData[i].sub_tasks[j].task_id}</p>
                            <p class="action"><i class="ic ic-edit"></i><i class="ic ic-delete"></i></p>
                        </div>`

        }
    }else{
        string += `<div class="flex">
        <p class="task-id"></p>
        <p class="task-name" onclick="addSubTask(${filteredData[i].task_id})"><span class="sc-title addnew">Add New +</span></p>
        <p class="start-date"></p>
        <p class="end-date"></p>
        <p class="status"></p>
        <p class="action"></p>
    </div>`

    }
    string += `</div></div>`;


}

const headers = `<div class="c-head">
<p class="task-id">Task Id</p>
<p class="task-name">Task Name</p>
<p class="start-date">Start Date</p>
<p class="end-date">End Date</p>
<p class="status">Status</p>
<p class="action">Actions</p>
</div>`;


wrapper.innerHTML = headers + string;

















})
